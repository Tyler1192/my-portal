// src/app/api/reserve/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---- ユーティリティ ----
const toIsoMinute = (d) => new Date(d).toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
const floorToMinute = (d) => { const x = new Date(d); x.setSeconds(0,0); x.setMilliseconds(0); return x; };
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

// "YYYY-MM-DDTHH:mm"（JST表記）→ UTCのDate（:00.000まで丸め）
function jstMinuteStringToUtcDate(s) {
  if (!s) return new Date(NaN);
  // 既にZが付くUTCならそのまま解釈（フォールバック）
  if (s.endsWith('Z')) {
    const z = new Date(s);
    z.setUTCSeconds(0, 0);
    return z;
  }
  const [d, t] = s.split('T');
  if (!d || !t) return new Date(NaN);
  const [Y, M, D] = d.split('-').map(Number);
  const [h, m]   = t.split(':').map(Number);
  const msUtc = Date.UTC(Y, M - 1, D, h, m, 0, 0) - JST_OFFSET_MS; // JST→UTCシフト
  const dt = new Date(msUtc);
  dt.setUTCSeconds(0, 0); // 秒・ミリ秒完全一致
  return dt;
}

// 30日分（今から先）の30分刻みスロット（UTC基準）
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
  // 未来30日分の枠を作る
  const slots = generateSlots(30);
  const from = slots[0];
  const to = slots[slots.length - 1];

  // 既存の予約をDBから取得（※パスワードは返さない！）
  const rows = await prisma.reservation.findMany({
    where: { time: { gte: from, lte: to } },
    select: { time: true, reserved: true },
  });

  const map = new Map(rows.map(r => [toIsoMinute(r.time), r]));

  // 返却形式（time は UTCの "YYYY-MM-DDTHH:mm"）
  const data = slots.map(t => {
    const key = toIsoMinute(t);
    const hit = map.get(key);
    return {
      time: key,
      reserved: hit?.reserved ?? false,
    };
  });

  return NextResponse.json(data);
}

// ---------------- POST: 予約処理（該当スロットを予約済みに） ----------------
export async function POST(req) {
  try {
    const { slot } = await req.json(); // "YYYY-MM-DDTHH:mm"（JST想定）
    if (!slot) {
      return NextResponse.json({ message: 'スロットが未指定です' }, { status: 400 });
    }

    // JST文字列 → UTCDateに統一
    const when = jstMinuteStringToUtcDate(slot);
    if (isNaN(when.getTime())) {
      return NextResponse.json({ message: '不正な時刻フォーマットです' }, { status: 400 });
    }

    // 既に予約済みかチェック
    const existing = await prisma.reservation.findUnique({ where: { time: when } });
    if (existing?.reserved) {
      return NextResponse.json({ message: 'この時間はすでに予約されています' }, { status: 400 });
    }

    // パスワード生成（6〜8桁程度）
    const password = Math.random().toString(36).slice(-8);

    // upsert で二重登録防止（time は unique 前提）
    await prisma.reservation.upsert({
      where: { time: when },
      update: { reserved: true, password },
      create: { time: when, reserved: true, password },
    });

    // 予約直後のみ返す（GETでは絶対に返さない）
    return NextResponse.json({ password });
  } catch (e) {
    console.error('reserve POST error:', e);
    return NextResponse.json({ message: '予約処理中にエラーが発生しました' }, { status: 500 });
  }
}
