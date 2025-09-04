// src/app/api/auth/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

// いまのJST時刻を 00/30 に丸めて → UTCのDateにして返す
function currentJstSlotStartAsUtc() {
  const now = new Date();
  const jstNow = new Date(now.getTime() + JST_OFFSET_MS);
  jstNow.setSeconds(0, 0);
  jstNow.setMinutes(jstNow.getMinutes() < 30 ? 0 : 30);
  const msUtc = jstNow.getTime() - JST_OFFSET_MS;
  const dt = new Date(msUtc);
  dt.setUTCSeconds(0, 0); // 秒・ミリ秒完全一致
  return dt;
}

// "YYYY-MM-DDTHH:mm"（JST表記）→ UTCのDate（:00.000まで丸め）
function jstMinuteStringToUtcDate(s) {
  if (!s) return new Date(NaN);
  if (s.endsWith('Z')) { // 互換：Z付きならUTCとして受ける
    const z = new Date(s);
    z.setUTCSeconds(0, 0);
    return z;
  }
  const [d, t] = s.split('T');
  if (!d || !t) return new Date(NaN);
  const [Y, M, D] = d.split('-').map(Number);
  const [h, m]   = t.split(':').map(Number);
  const msUtc = Date.UTC(Y, M - 1, D, h, m, 0, 0) - JST_OFFSET_MS; // JST→UTC
  const dt = new Date(msUtc);
  dt.setUTCSeconds(0, 0);
  return dt;
}

export async function POST(req) {
  try {
    const { password, slot } = await req.json();
    if (!password) {
      return NextResponse.json({ message: 'パスワードが必要です' }, { status: 400 });
    }

    // デフォルトは「現在のJST枠」で照合。slot（JST文字列）が来たらそれで照合も可（互換）。
    let when = currentJstSlotStartAsUtc();
    if (typeof slot === 'string' && slot.length >= 16) {
      const parsed = jstMinuteStringToUtcDate(slot);
      if (isNaN(parsed.getTime())) {
        return NextResponse.json({ message: '不正な時刻フォーマットです' }, { status: 400 });
      }
      when = parsed;

      // 任意：slot指定時は本当に"今"その枠内かをチェック（枠外なら拒否）
      const start = when;
      const end = new Date(start);
      end.setUTCMinutes(end.getUTCMinutes() + 30);
      const now = new Date();
      if (now < start || now >= end) {
        return NextResponse.json({ message: 'この時間帯では使えません' }, { status: 403 });
      }
    }

    const row = await prisma.reservation.findUnique({ where: { time: when } });
    if (!row?.reserved) {
      return NextResponse.json({ message: '現在の時間帯に有効な予約がありません' }, { status: 400 });
    }
    if (row.password !== password) {
      return NextResponse.json({ message: '無効なパスワードです' }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('auth POST error:', e);
    return NextResponse.json({ message: '認証でエラーが発生しました' }, { status: 500 });
  }
}
