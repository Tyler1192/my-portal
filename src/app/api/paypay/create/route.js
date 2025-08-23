// src/app/api/paypay/create/route.js
import { NextResponse } from 'next/server';
import PAYPAY from '../../../../lib/paypay';
import prisma from '../../../../lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const jsonErr = (status, body) =>
  NextResponse.json({ ok: false, ...body }, { status });

// "YYYY-MM-DDTHH:mm" もしくは "....Z" をUTCの分粒度として解釈
function parseUtcMinute(s) {
  if (!s) return new Date(NaN);
  return s.endsWith('Z') ? new Date(s) : new Date(`${s}:00.000Z`);
}

export async function POST(req) {
  try {
    const body = await req.json();

    // 金額は本来サーバ側で決定するのが安全。ひとまず現状互換で受け取る
    const amount = Math.floor(body?.amount ?? 0);
    const slot = body?.slot;
    const description = body?.description ?? 'Order';

    if (!amount || amount <= 0) {
      return jsonErr(400, { error: 'amount_is_required_integer>=1' });
    }
    if (!slot) {
      return jsonErr(400, { error: 'slot_is_required' });
    }

    // BASE URL（本番は本番ドメインに）
    const base = (process.env.NEXT_PUBLIC_BASE_URL || '').trim();
    if (!/^https?:\/\//i.test(base)) {
      return jsonErr(500, { error: 'NEXT_PUBLIC_BASE_URL_must_be_full_url', value: base });
    }

    // 事前にDBへ「仮」レコード作成（reserved=false）
    const when = parseUtcMinute(slot);
    if (isNaN(when.getTime())) {
      return jsonErr(400, { error: 'invalid_slot' });
    }

    const merchantPaymentId = 'order-' + Date.now();

    // 既にその枠が確定済みならエラー
    const exists = await prisma.reservation.findUnique({ where: { time: when } });
    if (exists?.reserved) {
      return jsonErr(409, { error: 'slot_already_reserved' });
    }

    // upsert で仮レコード（reserved=false, passwordは空でOK）
    await prisma.reservation.upsert({
      where: { time: when },
      update: { merchantPaymentId, reserved: false },
      create: { time: when, merchantPaymentId, reserved: false, password: '' }
    });

    // 決済完了後の戻り先（/paypay/complete?slot=...&mid=...）
    const redirectUrl =
      `${base.replace(/\/+$/, '')}/paypay/complete` +
      `?slot=${encodeURIComponent(slot)}&mid=${encodeURIComponent(merchantPaymentId)}`;

    console.log('[paypay/create] mid=%s slot=%s redirectUrl=%s',
      merchantPaymentId, slot, redirectUrl);      

    // PayPayへ作成リクエスト
    const payload = {
      merchantPaymentId,
      amount: { amount, currency: 'JPY' },
      codeType: 'ORDER_QR',
      orderDescription: description,
      isAuthorization: false,
      redirectUrl,
      redirectType: 'WEB_LINK',
      userAgent: 'Mozilla/5.0',
      requestedAt: Math.floor(Date.now() / 1000),
      ipAddress: '127.0.0.1', // 開発中は固定でOK。本番は実IPを渡す実装を
    };

    const resp = await PAYPAY.QRCodeCreate(payload);
    const bodyResp = resp?.BODY || {};
    const resultInfo = bodyResp.resultInfo;
    const url = bodyResp?.data?.url || bodyResp?.data?.deeplink;

    // デバッグログ（開発中のみ）
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

    // フロントへ決済URLとmidを返す
    return NextResponse.json({
      ok: true,
      url,
      mid: merchantPaymentId,
      resultInfo: resultInfo || { code: 'SUCCESS' }
    });

  } catch (e) {
    console.error('paypay create error:', e);
    return jsonErr(500, { error: 'create_failed', detail: String(e?.message ?? e) });
  }
}
