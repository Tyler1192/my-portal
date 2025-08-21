//ユーザー視点模擬はこれで成功
// src/app/api/paypay/status/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { merchantPaymentId } = await req.json();
    if (!merchantPaymentId) {
      return NextResponse.json({ error: 'merchantPaymentId_required' }, { status: 400 });
    }

    // そのIDが予約に紐づいていれば状態を返す（簡易ポーリング用）
    const row = await prisma.reservation.findFirst({
      where: { merchantPaymentId },
      select: { reserved: true }
    });

    if (!row) {
      // まだconfirmされていない想定
      return NextResponse.json({ status: 'PENDING' });
    }

    return NextResponse.json({ status: row.reserved ? 'COMPLETED' : 'PENDING' });
  } catch (e) {
    console.error('status error:', e);
    return NextResponse.json({ error: 'status_failed', detail: String(e?.message ?? e) }, { status: 500 });
  }
}
