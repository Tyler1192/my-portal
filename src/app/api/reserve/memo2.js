// こっちかも？
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { jstMinuteStringToUtcDate } from '../../../lib/tz-helpers'; // ←さっきのヘルパー

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// （任意）スロット一覧を返すときはパスワードを含めない！！
export async function GET() {
  // ここは既存ロジックのままでもOKですが、
  // 返却JSONに password を含めないように必ず修正してください。
  // ...
  // select: { time: true, reserved: true } にする  ← 重要
}

// 予約
export async function POST(req) {
  try {
    const { slot } = await req.json(); // "YYYY-MM-DDTHH:mm"（JST）
    if (!slot) return NextResponse.json({ message: 'スロットが未指定です' }, { status: 400 });

    const when = jstMinuteStringToUtcDate(slot); // ← JST→UTCに変換
    if (isNaN(when.getTime())) {
      return NextResponse.json({ message: '不正な時刻フォーマットです' }, { status: 400 });
    }

    // 既に予約済みかチェック
    const existing = await prisma.reservation.findUnique({ where: { time: when } });
    if (existing?.reserved) {
      return NextResponse.json({ message: 'この時間はすでに予約されています' }, { status: 400 });
    }

    // パスワード生成
    const password = Math.random().toString(36).slice(-8);

    // 保存（time はUTC、分丸め済み）
    await prisma.reservation.upsert({
      where: { time: when },
      update: { reserved: true, password },
      create: { time: when, reserved: true, password },
    });

    return NextResponse.json({ password }); // ← 予約直後だけ返す（GETでは出さない）
  } catch (e) {
    console.error('reserve POST error:', e);
    return NextResponse.json({ message: '予約処理中にエラーが発生しました' }, { status: 500 });
  }
}
