// app/api/generate/route.js
import { frameworks } from '../../../lib/frameworks';

export async function POST(req) {
  const { inputText, frameworkKey } = await req.json();
  const units = frameworks[frameworkKey];

  // ユニット単位で質問リストを整形
  let questionList = "";
  let qNum = 1;

  for (const [unitName, questions] of Object.entries(units)) {
    questionList += `＜${unitName}＞\n`;
    for (const q of questions) {
      questionList += `${qNum++}. ${q}\n回答：\n\n`;
    }
  }

  const prompt = `
以下の文章を読み、各質問に対して簡潔に答えてください。ただし、時系列によって回答が複数ある場合は、時間の情報も記載すること。
各ユニットの前には必ず「＜ユニット名＞」を記載してください。
分かる範囲で答えてください。全く該当する情報が見つからない場合のみ「なし」と答えてください。

【出力形式の例】
＜ユニット名＞
1. 質問
回答：〜〜
2. 質問
回答：〜〜

【長文】
${inputText}

【質問と回答】
${questionList}
  `;

  const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "あなたは医療レポートを要約するアシスタントです。",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    }),
  });

  const gptData = await gptRes.json();
  const answerText = gptData.choices?.[0]?.message?.content || "回答取得失敗";

  return new Response(JSON.stringify({ result: answerText }), {
    headers: { "Content-Type": "application/json" },
  });
}

