//ユーザー視点模擬はこれで成功
// src/app/api/paypay/confirm/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export const dynamic = 'force-dynamic';

function genPassword(len = 6) {
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// "YYYY-MM-DDTHH:mm" を UTC の 1分粒度として解釈
function parseUtcMinute(s) {
  if (!s) return new Date(NaN);
  if (s.endsWith('Z')) return new Date(s);
  // 例: 2025-08-20T13:00 -> 2025-08-20T13:00:00.000Z
  return new Date(`${s}:00.000Z`);
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slot = searchParams.get('slot');
    const mid  = searchParams.get('mid'); // merchantPaymentId

    if (!slot || !mid) {
      return NextResponse.json({ error: 'slot_and_mid_required' }, { status: 400 });
    }

    const when = parseUtcMinute(slot);
    if (isNaN(when.getTime())) {
      return NextResponse.json({ error: 'invalid_slot' }, { status: 400 });
    }

    const existing = await prisma.reservation.findUnique({ where: { time: when } });

    // 既に予約済みならそのまま返す（merchantPaymentId が無ければ補完）
    if (existing?.reserved) {
      if (!existing.merchantPaymentId) {
        await prisma.reservation.update({
          where: { time: when },
          data: { merchantPaymentId: mid }
        });
      }
      return NextResponse.json({
        status: 'COMPLETED',
        password: existing.password,
        alreadyReserved: true
      });
    }

    // 予約確定（まだなら作成）
    const password = existing?.password || genPassword();
    const saved = await prisma.reservation.upsert({
      where: { time: when },
      update: { reserved: true, password, merchantPaymentId: mid },
      create: { time: when, reserved: true, password, merchantPaymentId: mid }
    });

    return NextResponse.json({ status: 'COMPLETED', password: saved.password });
  } catch (e) {
    console.error('confirm error:', e);
    return NextResponse.json({ error: 'confirm_failed', detail: String(e?.message ?? e) }, { status: 500 });
  }
}
