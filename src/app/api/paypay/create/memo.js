//ユーザー視点模擬はこれで成功
import { NextResponse } from 'next/server';
import PAYPAY from '../../../../lib/paypay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


const jsonErr = (status, body) =>
  NextResponse.json({ ok: false, ...body }, { status });


export async function POST(req) {
  try {
    const body = await req.json();
    const amount = Math.floor(body?.amount ?? 0);
    const slot = body?.slot;
    const description = body?.description ?? 'Order';

    if (!amount || amount <= 0) return jsonErr(400, { error: 'amount_is_required_integer>=1' });
    if (!slot) return jsonErr(400, { error: 'slot_is_required' });

    const base = (process.env.NEXT_PUBLIC_BASE_URL || '').trim();
    if (!/^https?:\/\//i.test(base)) {
      return jsonErr(500, { error: 'NEXT_PUBLIC_BASE_URL_must_be_full_url', value: base });
    }

    const merchantPaymentId = 'order-' + Date.now();
    const redirectUrl =
      `${base.replace(/\/+$/, '')}/paypay/complete` +
      `?slot=${encodeURIComponent(slot)}&mid=${encodeURIComponent(merchantPaymentId)}`;

    // 追加: requestedAt / ipAddress
    const requestedAt = Math.floor(Date.now() / 1000);
    const ipAddress = '127.0.0.1'; // 開発中はこれでOK（本番は実ユーザーIPを渡す実装に）

    const payload = {
      merchantPaymentId,
      amount: { amount, currency: 'JPY' },
      codeType: 'ORDER_QR',
      orderDescription: description,
      isAuthorization: false,
      redirectUrl,
      redirectType: 'WEB_LINK',
      userAgent: 'Mozilla/5.0',
      requestedAt,
      ipAddress,
    };

    const resp = await PAYPAY.QRCodeCreate(payload);
    const bodyResp = resp?.BODY || {};
    const resultInfo = bodyResp.resultInfo;
    const url = bodyResp?.data?.url || bodyResp?.data?.deeplink;

    // ログに詳細を出す（開発中のみ）
    console.log('PAYPAY create resultInfo:', resultInfo);
    console.log('PAYPAY create data:', bodyResp?.data);

    if (resultInfo && resultInfo.code && resultInfo.code !== 'SUCCESS') {
      return jsonErr(502, {
        error: 'paypay_error',
        resultInfo,
        hint: { amount, redirectUrl, codeType: payload.codeType },
      });
    }

    if (!url) {
      return jsonErr(500, {
        error: 'no_link',
        resultInfo: resultInfo || null,
        note: 'Check env (keys, base url), payload, runtime=nodejs.',
      });
    }

    return NextResponse.json({ ok: true, url, mid: merchantPaymentId, resultInfo: resultInfo || { code: 'SUCCESS' } });

  } catch (e) {
    console.error('paypay create error:', e);
    return jsonErr(500, { error: 'create_failed', detail: String(e?.message ?? e) });
  }
}
