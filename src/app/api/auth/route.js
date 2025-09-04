// src/app/api/auth/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

// いまのJST時刻を 00/30 に丸めて → UTCのDateにして返す
function currentJstSlotStartAsUtc() {
  const now = new Date();
  const jstNow = new Date(now.getTime() + JST_OFFSET_MS);
  jstNow.setSeconds(0, 0);
  jstNow.setMinutes(jstNow.getMinutes() < 30 ? 0 : 30);
  const msUtc = jstNow.getTime() - JST_OFFSET_MS;
  const dt = new Date(msUtc);
  dt.setUTCSeconds(0, 0); // 秒・ミリ秒完全一致
  return dt;
}

export async function POST(req) {
  try {
    const { password } = await req.json();
    if (!password) {
      return NextResponse.json({ message: 'パスワードが必要です' }, { status: 400 });
    }

    const when = currentJstSlotStartAsUtc(); // ← JSTの現在枠 → UTC

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
