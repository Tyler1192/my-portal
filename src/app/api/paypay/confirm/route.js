import { NextResponse } from 'next/server';
import PAYPAY from '../../../../lib/paypay';
import prisma from '../../../../lib/prisma';
export const dynamic = 'force-dynamic';

function genPassword(len = 6) {
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random()*chars.length)]).join('');
}
function parseUtcMinute(s) {
  if (!s) return new Date(NaN);
  return s.endsWith('Z') ? new Date(s) : new Date(`${s}:00.000Z`);
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

    // 1) PayPay側の最終確認
    const resp = await PAYPAY.GetCodePaymentDetails([mid]);
    const status = resp?.BODY?.data?.status || resp?.BODY?.resultInfo?.status || 'UNKNOWN';
    if (status !== 'COMPLETED') {
      // 失敗・キャンセル・期限切れ・未完了は確定しない
      return NextResponse.json({ status }, { status: 200 });
    }

    // 2) 既存チェック
    const existing = await prisma.reservation.findUnique({ where: { time: when } });

    if (existing?.reserved) {
      // 既に確定済みならそのまま返す（idempotent）
      if (!existing.merchantPaymentId) {
        await prisma.reservation.update({ where: { time: when }, data: { merchantPaymentId: mid } });
      }
      return NextResponse.json({
        status: 'COMPLETED',
        password: existing.password,
        alreadyReserved: true
      });
    }

    // 3) 予約確定（まだなら作成/更新）
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
