// src/app/api/paypay/status/route.js
import { NextResponse } from 'next/server';
import PAYPAY from '../../../../lib/paypay'; // ラッパの実体に合わせる
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { merchantPaymentId } = await req.json();
    if (!merchantPaymentId) {
      return NextResponse.json({ error: 'merchantPaymentId_required' }, { status: 400 });
    }

    // PayPayのステータス照会（あなたのラッパに合わせて）
    const resp = await PAYPAY.GetCodePaymentDetails([merchantPaymentId]);
    const body = resp?.BODY || {};
    const status = body?.data?.status || body?.resultInfo?.status || 'UNKNOWN';

    return NextResponse.json({ status });
  } catch (e) {
    console.error('status error:', e);
    return NextResponse.json({ error: 'status_failed', detail: String(e?.message ?? e) }, { status: 500 });
  }
}
