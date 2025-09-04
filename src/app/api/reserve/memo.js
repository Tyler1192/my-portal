// ローカルはこれでクリア
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // ← 位置に合わせて相対パス。src/app/api/reserve から3つ上

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---- ユーティリティ ----
const toIsoMinute = (d) => new Date(d).toISOString().slice(0, 16);        // "YYYY-MM-DDTHH:mm"
const floorToMinute = (d) => { const x = new Date(d); x.setSeconds(0,0); return x; };

// 30日分（今から先）の 30分刻みスロットを生成（UTC基準：従来の JSON と同じ挙動）
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

//このfunction新しく追加。模擬では未使用
function parseUtcMinute(s) {
  if (!s) return new Date(NaN);
  return s.endsWith('Z') ? new Date(s) : new Date(`${s}:00.000Z`);
}


// ---------------- GET: スロット一覧（DBとマージして返す） ----------------
export async function GET() {
  // 未来30日分の枠を作る
  const slots = generateSlots(30);
  const from = slots[0];
  const to = slots[slots.length - 1];

  // 既存の予約をDBから取得
  const rows = await prisma.reservation.findMany({
    where: { time: { gte: from, lte: to } },
    select: { time: true, reserved: true, password: true },
  });

  const map = new Map(rows.map(r => [toIsoMinute(r.time), r]));

  // 返却形式は従来の JSON と同じ（time は "YYYY-MM-DDTHH:mm"）
  const data = slots.map(t => {
    const key = toIsoMinute(t);
    const hit = map.get(key);
    return {
      time: key,
      reserved: hit?.reserved ?? false,
      password: hit?.password ?? '',
    };
  });

  return NextResponse.json(data);
}

// ---------------- POST: 予約処理（該当スロットを予約済みに） ----------------
export async function POST(req) {
  try {
    const { slot } = await req.json();
    if (!slot) {
      return NextResponse.json({ message: 'スロットが未指定です' }, { status: 400 });
    }

    // "YYYY-MM-DDTHH:mm" でも受け付ける（Dateで解釈）
    const when = parseUtcMinute(slot);
    if (isNaN(when.getTime())) {
      return NextResponse.json({ message: '不正な時刻フォーマットです' }, { status: 400 });
    }

    // 既に予約済みかチェック
    const existing = await prisma.reservation.findUnique({ where: { time: when } });

    if (existing?.reserved) {
      return NextResponse.json({ message: 'この時間はすでに予約されています' }, { status: 400 });
    }

    // パスワード生成（従来互換：6〜8桁あたり）
    const password = Math.random().toString(36).slice(-8);

    // upsert で二重登録を防止（time は unique）
    const saved = await prisma.reservation.upsert({
      where: { time: when },
      update: { reserved: true, password },
      create: { time: when, reserved: true, password },
    });

    return NextResponse.json({ password: saved.password });
  } catch (e) {
    console.error('reserve POST error:', e);
    return NextResponse.json({ message: '予約処理中にエラーが発生しました' }, { status: 500 });
  }
}
