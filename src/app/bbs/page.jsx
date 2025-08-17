'use client';

import { useState, useEffect } from 'react';

export default function BbsPage() {
  const [timeslots, setTimeslots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // 30日分のスロットを取得
    fetch('/api/reserve')
      .then((res) => res.json())
      .then((data) => setTimeslots(data))
      .catch((err) => setError('スロットの取得に失敗しました'));
  }, []);

  const handleReserve = async () => {
    setError('');
    setPassword('');
  
    const res = await fetch('/api/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slot: selectedSlot }),
    });
  
    if (res.ok) {
      const data = await res.json();
      setPassword(data.password);
    } else {
      let message = '予約に失敗しました';
      try {
        const data = await res.json();
        message = data.message || message;
      } catch (err) {
        // JSON パースに失敗しても無視
      }
      setError(message);
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
        disabled={!selectedSlot}
      >
        予約してパスワードを取得
      </button>

      {password && (
        <p className="mt-4 text-green-600 font-bold">
          この時間帯のパスワード：{password}
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-bold">
          {error}
        </p>
      )}
    </div>
  );
}
