'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// これでプリレンダーを抑止（ビルド時のエクスポートエラー回避）
export const dynamic = 'force-dynamic';

function CompleteInner() {
  const sp = useSearchParams();
  const slot = sp.get('slot');
  const mid  = sp.get('mid');

  const [status, setStatus] = useState('決済状況を確認中です…');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const canSim = process.env.NEXT_PUBLIC_ENABLE_PAYPAY_SIMULATE === 'true';

  useEffect(() => {
    if (!slot || !mid) { setError('パラメータ不足'); setStatus(''); return; }
    const poll = async () => {
      try {
        const r = await fetch('/api/paypay/status', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ merchantPaymentId: mid })
        });
        const d = await r.json();
        if (d.status === 'COMPLETED') {
          const rr = await fetch('/api/paypay/confirm?mid=' + encodeURIComponent(mid) + '&slot=' + encodeURIComponent(slot));
          const dd = await rr.json();
          if (dd?.status === 'COMPLETED' && dd?.password) {
            setPassword(dd.password); setStatus('支払い成功。パスワードを発行しました。'); return;
          }
        } else if (d.status === 'FAILED' || d.status === 'CANCELED') {
          setStatus('支払いがキャンセル/失敗しました。'); return;
        }
        setTimeout(poll, 4000);
      } catch (e) { setError('確認に失敗しました'); setStatus(''); }
    };
    poll();
  }, [slot, mid]);

  const simulate = async (action) => {
    setError(''); setStatus('擬似' + (action==='success'?'成功':'失敗') + 'を適用中…');
    const r = await fetch('/api/paypay/simulate', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, slot, merchantPaymentId: mid })
    });
    const d = await r.json();
    if (d?.status === 'COMPLETED' && d?.password) {
      setPassword(d.password); setStatus('（擬似）支払い成功。パスワードを発行しました。');
    } else if (d?.status === 'FAILED') {
      setStatus('（擬似）支払い失敗にしました。');
    } else {
      setError(d?.error || '擬似操作に失敗しました'); setStatus('');
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">決済完了確認</h1>
      {status && <p className="mb-3">{status}</p>}
      {password && <p className="text-green-600 font-bold">この時間帯のパスワード：{password}</p>}
      {error && <p className="text-red-600">{error}</p>}

      {canSim && (
        <div className="mt-6 flex gap-3">
          <button onClick={() => simulate('success')} className="bg-green-600 text-white px-3 py-2 rounded">
            （開発用）擬似・成功
          </button>
          <button onClick={() => simulate('fail')} className="bg-gray-500 text-white px-3 py-2 rounded">
            （開発用）擬似・失敗
          </button>
        </div>
      )}
    </main>
  );
}

export default function CompletePage() {
  return (
    <Suspense fallback={<main className="p-6 max-w-2xl mx-auto"><p>読み込み中…</p></main>}>
      <CompleteInner />
    </Suspense>
  );
}
