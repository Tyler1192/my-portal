'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ 追加

export default function Step2Page() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const router = useRouter(); // ✅ 追加

  const processText = () => {
    const lines = inputText.trim().split('\n').map(line => line.trim()).filter(line => line !== '');
    const outputLines = [];
  
    let i = 0;
    let currentFramework = '';
    let questionCounter = 1;
  
    while (i < lines.length) {
      const line = lines[i];
  
      // 枠組み（【①〜】）は常に残す
      if (/^【[①-⑪]/.test(line)) {
        currentFramework = line;
        outputLines.push(line);  // ← 必ず出力
        i++;
      }
  
      // ユニット名（＜〜＞）に対する処理
      else if (/^＜.+＞$/.test(line)) {
        const unitTitle = line;
        const unitContent = [];
        i++;
  
        while (i < lines.length && !/^【[①-⑪]/.test(lines[i]) && !/^＜.+＞$/.test(lines[i])) {
          const question = lines[i];
          const answer = lines[i + 1] || '';
  
          const questionMatch = question.match(/^\d+\.\s*(.+)/);
          const questionText = questionMatch ? questionMatch[1] : null;
  
          if (questionText) {
            if (!/^回答：\s*なし[。です]?$/i.test(answer)) {
              unitContent.push(`${questionCounter}. ${questionText}`);
              unitContent.push(answer);
            }
            questionCounter++;
          }
  
          i += 2;
        }
  
        // 質問が残っている場合だけユニット名と中身を追加
        if (unitContent.length > 0) {
          outputLines.push(unitTitle);
          outputLines.push(...unitContent);
        }
      }
  
      // それ以外の行（無視）
      else {
        i++;
      }
    }
  
    setOutputText(outputLines.join('\n'));
  };
  
  const handleNext = () => {
    router.push('/step3'); // ✅ 次のページへ遷移
  };  

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">「回答：なし」削除</h1>
      <p className="mb-2">
        「回答：なし」のQ&Aだけを削除してコンパクトにします。
      </p>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={20}
        placeholder="出力を貼り付けてください..."
        className="w-full border rounded p-2 mb-4"
      />
      <button
        onClick={processText}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        実行
      </button>

      <h2 className="text-xl font-bold mt-6 mb-2">結果</h2>
      <pre className="whitespace-pre-wrap bg-gray-100 p-4 border rounded">
        {outputText}
      </pre>

      {/* ✅ 「次へ」ボタン */}
      <button
        onClick={handleNext}
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
      >
        次へ
      </button>      
    </div>
  );
}
