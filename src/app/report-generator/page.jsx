'use client';

import { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';  //追加
import { frameworks } from '@/lib/frameworks';

export default function ReportGenerator() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter(); //追加
  const [authenticated, setAuthenticated] = useState(false); // ← 追加
  const [passwordInput, setPasswordInput] = useState('');     // ← 追加
  const [authError, setAuthError] = useState('');             // ← 追加

  
  useEffect(() => {
    const granted = localStorage.getItem('access_granted');
    const expiresAt = localStorage.getItem('access_expires_at');
  
    if (granted === 'true' && expiresAt && new Date() < new Date(expiresAt)) {
      setAuthenticated(true);
    } else {
      localStorage.removeItem('access_granted');
      localStorage.removeItem('access_expires_at');
    }
  }, []);
  
  const handleSubmit = async () => {
    setLoading(true);
    setResult('');
    const text = document.getElementById('inputText').value;
    let combined = '';

    for (const [frameworkKey, units] of Object.entries(frameworks)) {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText: text, frameworkKey }),
      });

      const data = await res.json();
      combined += `【${frameworkKey}】\n${data.result}\n\n`;

      await new Promise((r) => setTimeout(r, 500));
    }

    setResult(combined);
    setLoading(false);
    setSubmitted(true);
  };

  const handleAuth = async () => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passwordInput }),
    });
  
    if (res.ok) {
      setAuthenticated(true);
      localStorage.setItem('access_granted', 'true');
  
      // 🔽 有効期限（次のスロット終了）を保存
      const expire = new Date();
      const minutes = expire.getMinutes();
      expire.setMinutes(minutes < 30 ? 30 : 60, 0, 0);
      localStorage.setItem('access_expires_at', expire.toISOString());
  
    } else {
      const data = await res.json();
      setAuthError(data.message || '認証に失敗しました');
    }
  };

  const handleNext = () => {
    router.push('/step2'); // 次のページに移動（URLは必要に応じて変更）
  };  

  if (!authenticated) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">パスワードを入力してください</h2>
        <input
          type="text"
          className="w-full border p-2 rounded mb-2"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="パスワード"
        />
        <button onClick={handleAuth} className="bg-blue-500 text-white px-4 py-2 rounded">
          入場する
        </button>
        {authError && <p className="text-red-600 mt-2">{authError}</p>}
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">11の機能的健康パターン</h1>
      <textarea
        id="inputText"
        rows="10"
        cols="60"
        placeholder="ここに長文を入力"
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
        disabled={loading || submitted} 
      >
        {loading ? '生成中...' : '実行'}
      </button>
      <pre
        id="output"
        className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-wrap max-h-[500px] overflow-y-auto border"
      >
        {result}
      </pre>

      <button
        onClick={handleNext}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        次に進む
      </button>
    </div>
  );
}
