import { NextResponse } from 'next/server';
import PAYPAY from '../../../../lib/paypay';         // ラッパの実体に合わせる
import prisma from '../../../../lib/prisma';         // 相対パス注意
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { merchantPaymentId } = await req.json();
    if (!merchantPaymentId) {
      return NextResponse.json({ error: 'merchantPaymentId_required' }, { status: 400 });
    }

    // PayPayのステータス照会（あなたのラッパに合わせて呼び出し）
    // 例: GetCodePaymentDetails([mid]) でOK（あなたの既存コードに合わせています）
    const resp = await PAYPAY.GetCodePaymentDetails([merchantPaymentId]);
    const body = resp?.BODY || {};
    const status = body?.data?.status || body?.resultInfo?.status || 'UNKNOWN';

    // 参考：ここでDBの補助判定（あってもなくても可）
    // const row = await prisma.reservation.findFirst({ where: { merchantPaymentId }, select: { reserved: true } });

    return NextResponse.json({ status });
  } catch (e) {
    console.error('status error:', e);
    return NextResponse.json({ error: 'status_failed', detail: String(e?.message ?? e) }, { status: 500 });
  }
}
