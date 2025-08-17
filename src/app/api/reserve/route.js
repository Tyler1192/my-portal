import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/reservation.json');

// ---------------- GET: スロット一覧の生成・取得 ----------------
export async function GET() {
  let existingData = [];

  try {
    const file = await fs.readFile(filePath, 'utf-8');
    existingData = JSON.parse(file);
  } catch {
    existingData = [];
  }

  const now = new Date();
  now.setSeconds(0, 0);

  const allSlots = [];

  for (let d = 0; d < 30; d++) {
    const day = new Date(now);
    day.setDate(now.getDate() + d);

    for (let h = 0; h < 24; h++) {
      for (let m of [0, 30]) {
        const slot = new Date(day);
        slot.setHours(h, m, 0, 0);

        if (slot < now) continue;

        const isoTime = slot.toISOString().slice(0, 16);
        const found = existingData.find(s => s.time === isoTime);

        if (found) {
          allSlots.push(found);
        } else {
          allSlots.push({ time: isoTime, reserved: false, password: '' });
        }
      }
    }
  }

  await fs.writeFile(filePath, JSON.stringify(allSlots, null, 2), 'utf-8');

  return NextResponse.json(allSlots);
}

// ---------------- POST: 予約処理 ----------------
export async function POST(req) {
  const { slot } = await req.json();

  if (!slot) {
    return NextResponse.json({ message: 'スロットが未指定です' }, { status: 400 });
  }

  try {
    const file = await fs.readFile(filePath, 'utf-8');
    const reservations = JSON.parse(file);

    const index = reservations.findIndex(s => s.time === slot);

    if (index === -1) {
      return NextResponse.json({ message: '指定された時間帯が見つかりません' }, { status: 404 });
    }

    if (reservations[index].reserved) {
      return NextResponse.json({ message: 'この時間はすでに予約されています' }, { status: 400 });
    }

    // パスワード生成
    const password = Math.random().toString(36).slice(-8);
    reservations[index].reserved = true;
    reservations[index].password = password;

    await fs.writeFile(filePath, JSON.stringify(reservations, null, 2), 'utf-8');

    return NextResponse.json({ password }); // 成功時
  } catch {
    return NextResponse.json({ message: '予約処理中にエラーが発生しました' }, { status: 500 });
  }
}
