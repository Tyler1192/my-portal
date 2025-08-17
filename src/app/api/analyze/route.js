// src/app/api/analyze/route.js

export async function POST(req) {
  const { framework, qaContent } = await req.json();

  const prompt = `
以下は「${framework}」に関する質問とその回答です。
質問番号と回答内容をもとに、事実をもとに、患者やその家族、患者の疾病に関する考察をしてください。
以下のような形式を参考にしてください：
「12．20．より、飲酒量が多く、これによって高血圧が引き起こされたと考えられる。」

--- 質問と回答 ---
${qaContent}
`;

  if (!process.env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ result: 'APIキーが設定されていません' }), {
      status: 500,
    });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!openaiRes.ok) {
      const errorBody = await openaiRes.text();
      console.error('OpenAI API error:', errorBody);
      return new Response(JSON.stringify({ result: 'OpenAI APIエラー: ' + errorBody }), {
        status: 500,
      });
    }

    const data = await openaiRes.json();
    const result = data.choices?.[0]?.message?.content ?? '考察が得られませんでした';

    return new Response(JSON.stringify({ result }), {
      status: 200,
    });
  } catch (err) {
    console.error('❌ API Error:', err);
    return new Response(JSON.stringify({ result: 'API呼び出しエラー' }), {
      status: 500,
    });
  }
}
