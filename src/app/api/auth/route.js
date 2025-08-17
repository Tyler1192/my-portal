import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { password } = body;

  // 固定パスワードでの認証
  const fixedPassword = 'MeLSC2025';

  if (password === fixedPassword) {
    return NextResponse.json({ ok: true });
  } else {
    return NextResponse.json({ message: '無効なパスワードです' }, { status: 401 });
  }
}
