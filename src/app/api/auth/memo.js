import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
  const body = await req.json();
  const { password } = body;

  if (!password) {
    return NextResponse.json({ message: 'パスワードが必要です' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'data/reservation.json');

  try {
    const file = await fs.readFile(filePath, 'utf-8');
    const reservations = JSON.parse(file);

    const now = new Date();

    // パスワードが一致し、現在の時刻がそのスロットの30分間に含まれるかチェック
    const matched = reservations.find((r) => {
      if (r.password !== password) return false;

      const slotTime = new Date(r.time); // スロット開始時刻
      const endTime = new Date(slotTime.getTime() + 30 * 60 * 1000); // スロット終了（+30分）

      return now >= slotTime && now < endTime;
    });

    if (matched) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({ message: '無効なパスワードです（時間外か不正）' }, { status: 401 });
    }

  } catch (err) {
    return NextResponse.json({ message: '予約データの読み込みに失敗しました' }, { status: 500 });
  }
}
