// src/app/api/reserve/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---- Utils (全部ここで定義して未定義エラーを排除) ----
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

const floorToMinute = (d) => {
  const x = new Date(d);
  x.setSeconds(0, 0);
  x.setMilliseconds(0);
  return x;
};

// UTC Date → "YYYY-MM-DDTHH:mm"（Zなし）※内部キー用
const toIsoMinuteUtcNoZ = (d) => new Date(d).toISOString().slice(0, 16);

// UTC Date → "YYYY-MM-DDTHH:mm"（JST表示用）
function toJstIsoMinute(d) {
  const t = new Date(new Date(d).getTime() + JST_OFFSET_MS);
  const pad = (n) => String(n).padStart(2, '0');
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}T${pad(t.getHours())}:${pad(t.getMinutes())}`;
}

// "YYYY-MM-DDTHH:mm"（JST表記）→ UTC Date（:00.000まで丸め）
function jstMinuteStringToUtcDate(s) {
  if (!s) return new Date(NaN);
  if (s.endsWith('Z')) { // 互換: Z付きならUTCとして受ける
    const z = new Date(s);
    z.setUTCSeconds(0, 0);
    return z;
  }
  const [d, t] = s.split('T');
  if (!d || !t) return new Date(NaN);
  const [Y, M, D] = d.split('-').map(Number);
  const [h, m] = t.split(':').map(Number);
  const msUtc = Date.UTC(Y, M - 1, D, h, m, 0, 0) - JST_OFFSET_MS; // JST→UTC
  const dt = new Date(msUtc);
  dt.setUTCSeconds(0, 0);
  return dt;
}

// 今から30日分の30分刻みスロット（UTC基準）
function generateSlots(days = 30) {
  const now = floorToMinute(new Date());
  const slots = [];
  for (let d = 0; d < days; d++) {
    for (let h = 0; h < 24; h++) {
      for (const m of [0, 30]) {
        const t = new Date(now);
        t.setUTCDate(now.getUTCDate() + d);
        t.setUTCHours(h, m, 0, 0);
        if (t >= now) slots.push(new Date(t));
      }
    }
  }
  return slots;
}

// ---------------- GET: スロット一覧（DBとマージして返す） ----------------
export async function GET() {
  try {
    const slots = generateSlots(30);
    const from = slots[0];
    const to = slots[slots.length - 1];

    // 予約状態（パスワードは返さない）
    const rows = await prisma.reservation.findMany({
      where: { time: { gte: from, lte: to } },
      select: { time: true, reserved: true },
    });

    // DBのUTC Dateを分精度キーに
    const map = new Map(rows.map((r) => [toIsoMinuteUtcNoZ(r.time), r]));

    // 後方互換: time = JST文字列 / timeJst も同値 / timeUtc は参考
    const data = slots.map((t) => {
      const keyUtcNoZ = toIsoMinuteUtcNoZ(t);
      const hit = map.get(keyUtcNoZ);
      const timeJst = toJstIsoMinute(t);
      return {
        time: timeJst,          // 旧フロントが読むフィールド
        timeJst,                // 明示的JST
        timeUtc: keyUtcNoZ,     // 参考（開発用）
        reserved: hit?.reserved ?? false,
      };
    });

    return NextResponse.json(data);
  } catch (e) {
    console.error('reserve GET error:', e);
    return NextResponse.json({ message: 'スロット取得中にエラーが発生しました' }, { status: 500 });
  }
}

// ---------------- POST: 予約処理（該当スロットを予約済みに） ----------------
export async function POST(req) {
  try {
    const { slot } = await req.json(); // "YYYY-MM-DDTHH:mm"（JST想定）
    if (!slot) {
      return NextResponse.json({ message: 'スロットが未指定です' }, { status: 400 });
    }

    // JST→UTC Date
    const when = jstMinuteStringToUtcDate(slot);
    if (isNaN(when.getTime())) {
      return NextResponse.json({ message: '不正な時刻フォーマットです' }, { status: 400 });
    }

    // 既に予約済みか
    const existing = await prisma.reservation.findUnique({ where: { time: when } });
    if (existing?.reserved) {
      return NextResponse.json({ message: 'この時間はすでに予約されています' }, { status: 400 });
    }

    const password = Math.random().toString(36).slice(-8);

    await prisma.reservation.upsert({
      where: { time: when }, // time は @unique 前提
      update: { reserved: true, password },
      create: { time: when, reserved: true, password },
    });

    return NextResponse.json({ password }); // GETでは返さない
  } catch (e) {
    console.error('reserve POST error:', e);
    return NextResponse.json({ message: '予約処理中にエラーが発生しました' }, { status: 500 });
  }
}
