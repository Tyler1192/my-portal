// src/app/refund/page.jsx

export const metadata = {
  title: '返品・キャンセルポリシー',
  description: '本サービスの返品・キャンセル・返金に関する方針を定めています。',
};

export default function RefundPolicyPage() {
  return (
    <main className="max-w-[880px] mx-auto my-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-extrabold mb-6">返品・キャンセルポリシー</h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">1. 返金の取扱い</h2>
        <p className="text-gray-700 leading-relaxed">
          当社は、<strong>お支払い完了後の返金を一切承りません</strong>。いかなる理由による返金のご要望にも応じかねます。
          <span className="block mt-2 text-sm text-gray-600">
            ※ ただし、消費者契約法その他の<strong>法令により返金等の対応が必要となる場合</strong>は、当該法令に従い適切に対応します。
          </span>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">2. キャンセルの取扱い</h2>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1">
          <li>お支払い完了後の<strong>キャンセルは受け付けておりません</strong>。</li>
          <li>決済リンクの有効期限内にお支払いが行われなかった場合、申込みは自動的に無効となり、予約は確定されません（料金発生なし）。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">3. 予約日時の変更</h2>
        <p className="text-gray-700 leading-relaxed">
          お支払い完了後の<strong>予約日時の変更は承っておりません</strong>。ご都合をご確認のうえ、お申込みください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">4. 無断キャンセル・連絡不通</h2>
        <p className="text-gray-700 leading-relaxed">
          無断キャンセルや連絡不通の場合も<strong>返金は行いません</strong>。予約は消化扱いとなります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">5. 当社都合の提供中止・提供不能</h2>
        <p className="text-gray-700 leading-relaxed">
          当社の責に帰すべき事由により役務提供が不可能となった場合は、<strong>代替提供（振替等）</strong>を原則とし、
          代替提供が不可能なときは<strong>法令に従い適切に対応</strong>します。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-2">6. お問い合わせ窓口</h2>
        <p className="text-gray-700 leading-relaxed">
          医療サービスSynaplus 返品・キャンセルに関するお問い合わせ窓口<br />
          住所：名古屋市天白区表山1-1107-1<br />
          メール：contact@kango-useful-tool.com / 電話：09029454983
        </p>
      </section>

      <div className="text-sm text-gray-600">
        <p>制定日：2025年8月25日</p>
        <p>最終改定日：2025年8月25日</p>
      </div>

      <p className="mt-6 text-xs text-gray-500">
        ※ 本ページの記載は、現時点の運用方針を示すものであり、法令改正やサービス内容の変更に伴い、予告なく改定する場合があります。
      </p>
    </main>
  );
}
