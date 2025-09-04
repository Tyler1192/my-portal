// src/app/api/auth/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// 現在のUTC時刻を 00分 or 30分に丸める
function currentUtcSlotStart() {
  const now = new Date();
  const minutes = now.getUTCMinutes();
  const slotMinutes = minutes < 30 ? 0 : 30;
  const t = new Date(now);
  t.setUTCMinutes(slotMinutes, 0, 0); // 秒・ミリ秒までゼロ
  return t;
}

export async function POST(req) {
  try {
    const { password } = await req.json();
    if (!password) {
      return NextResponse.json({ message: 'パスワードが必要です' }, { status: 400 });
    }

    // 現在の30分枠（UTC）
    const when = currentUtcSlotStart();

    // DBに保存されている予約を取得
    const row = await prisma.reservation.findUnique({ where: { time: when } });

    if (!row?.reserved) {
      return NextResponse.json({ message: '現在の時間帯に有効な予約がありません' }, { status: 400 });
    }
    if (row.password !== password) {
      return NextResponse.json({ message: '無効なパスワードです' }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('auth POST error:', e);
    return NextResponse.json({ message: '認証でエラーが発生しました' }, { status: 500 });
  }
}
