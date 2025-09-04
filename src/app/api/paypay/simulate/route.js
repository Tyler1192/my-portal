import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function genPassword(len = 6) {
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random()*chars.length)]).join('');
}

// "YYYY-MM-DDTHH:mm" or "...Z" を UTC の分粒度で解釈
function parseUtcMinute(s) {
  if (!s) return new Date(NaN);
  return s.endsWith('Z') ? new Date(s) : new Date(`${s}:00.000Z`);
}

export async function POST(req) {
  try {
    // 開発フラグが無いと拒否（本番事故防止）
    if (process.env.PAYPAY_SIMULATE !== 'true') {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }

    const { action, slot, merchantPaymentId } = await req.json(); // action: "success" | "fail"
    if (!action || !slot) {
      return NextResponse.json({ error: 'action and slot are required' }, { status: 400 });
    }

    if (action === 'fail') {
      return NextResponse.json({ status: 'FAILED' });
    }

    // success: 予約確定（/api/paypay/confirm と同じ処理）
    const when = parseUtcMinute(slot);
    if (isNaN(when.getTime())) {
      return NextResponse.json({ error: 'invalid slot' }, { status: 400 });
    }

    const existing = await prisma.reservation.findUnique({ where: { time: when } });
    if (existing?.reserved) {
      return NextResponse.json({ status: 'COMPLETED', password: existing.password, alreadyReserved: true });
    }

    const password = genPassword();
    await prisma.reservation.upsert({
      where: { time: when },
      update: { reserved: true, password, merchantPaymentId: merchantPaymentId ?? null },
      create: { time: when, reserved: true, password, merchantPaymentId: merchantPaymentId ?? null }
    });

    return NextResponse.json({ status: 'COMPLETED', password });
  } catch (e) {
    console.error('simulate error:', e);
    return NextResponse.json({ error: 'simulate_failed', detail: String(e?.message ?? e) }, { status: 500 });
  }
}
