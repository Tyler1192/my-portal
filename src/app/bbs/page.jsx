'use client';

import { useState, useEffect } from 'react';

export default function BbsPage() {
  const [timeslots, setTimeslots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    // 30日分のスロットを取得
    fetch('/api/reserve')
      .then((res) => res.json())
      .then((data) => setTimeslots(data))
      .catch(() => setError('スロットの取得に失敗しました'));
  }, []);

  const handleReserve = async () => {
    setError('');
    setPassword('');

    if (!selectedSlot) {
      setError('時間帯を選択してください');
      return;
    }

    try {
      setCreating(true);

      // PayPay 決済リンクの作成（amountは例：500円）
      const res = await fetch('/api/paypay/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 500,
          description: `予約: ${selectedSlot}`,
          slot: selectedSlot,
        }),
      });

      // サーバーがHTMLエラーページを返す可能性に備える
      const ct = res.headers.get('content-type') || '';
      let data;
      if (ct.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`サーバーがJSON以外を返しました: ${text.slice(0, 200)}...`);
      }

      if (res.ok && data?.url) {
        // PayPay の決済ページへ移動
        window.location.href = data.url;
        return;
      }

      // エラー詳細（resultInfo）があれば優先表示
      if (data?.resultInfo) {
        const { code, message } = data.resultInfo;
        setError(`決済リンクの作成に失敗しました（${code ?? 'NO_CODE'}）: ${message ?? '原因不明'}`);
      } else if (data?.error) {
        setError(
          typeof data.error === 'string'
            ? data.error
            : '決済リンクの作成に失敗しました'
        );
      } else {
        setError('決済リンクの作成に失敗しました');
      }
    } catch (err) {
      console.error(err);
      setError('決済開始に失敗しました。ネットワークまたはサーバー設定を確認してください。');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">時間帯を選んで予約（30分単位）</h1>

      <select
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">-- 時間帯を選択してください --</option>
        {timeslots.map((slot) => (
          <option key={slot.time} value={slot.time} disabled={slot.reserved}>
            {slot.time} {slot.reserved ? '(予約済み)' : ''}
          </option>
        ))}
      </select>

      <button
        onClick={handleReserve}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={!selectedSlot || creating}
      >
        {creating ? '決済リンクを作成中…' : '予約してパスワードを取得（PayPay決済へ）'}
      </button>

      {password && (
        <p className="mt-4 text-green-600 font-bold">
          この時間帯のパスワード：{password}
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-bold whitespace-pre-wrap">
          {error}
        </p>
      )}
    </div>
  );
}
