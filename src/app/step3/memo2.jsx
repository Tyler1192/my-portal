//パスワード固定
'use client';

import { useState } from 'react';
import { useEffect } from 'react';

export default function Step3Page() {
  const [inputText, setInputText] = useState('');
  const [outputMap, setOutputMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

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
  

  const analyzeText = async () => {
    setLoading(true);
    setOutputMap({});

    // 枠組み単位で分割
    const blocks = inputText.split(/(?=^【[①-⑪])/m); // 各【①〜】で区切る
    const results = {};

    for (const block of blocks) {
      const lines = block.trim().split('\n').filter(Boolean);
      const header = lines[0]?.trim();

      if (!header || !/^【[①-⑪]/.test(header)) continue;

      const content = lines.slice(1).join('\n');

      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            framework: header,
            qaContent: content,
          }),
        });

        const data = await res.json();
        results[header] = data.result;
      } catch (err) {
        results[header] = '❌ エラーが発生しました';
      }
    }

    setOutputMap(results);
    setLoading(false);
    setSubmitted(true);
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">枠組みごとの解釈・考察</h1>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={20}
        placeholder="step2の出力を貼り付けてください..."
        className="w-full border rounded p-2 mb-4"
      />

      <button
        onClick={analyzeText}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        disabled={loading || submitted}
      >
        {loading ? '解析中...' : '実行'}
      </button>

      <div className="mt-8">
        {Object.entries(outputMap).map(([header, result]) => (
          <div key={header} className="mb-6 border rounded p-4 bg-gray-50">
            <h2 className="font-bold text-lg mb-2">{header}</h2>
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
