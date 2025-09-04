// src/app/privacy/page.jsx

export const metadata = {
  title: 'プライバシーポリシー',
  description: '本サービスにおける個人情報の取扱い方針について記載しています。',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-[880px] mx-auto my-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-extrabold mb-6">プライバシーポリシー</h1>

      <p className="mb-6 text-gray-700 leading-relaxed">
        医療サービスSynaplus（以下「当社」といいます。）は、当社が提供する本サービスにおける利用者の個人情報について、
        以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定め、適切に保護・管理します。
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">1. 適用範囲</h2>
        <p className="text-gray-700 leading-relaxed">
          本ポリシーは、当社が本サービスの提供にあたり取得・利用する個人情報等の取扱いに適用されます。
          本サービスからリンクされた第三者サイト等における取扱いについては、各運営者の方針に従います。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">2. 取得する情報</h2>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1">
          <li>氏名、連絡先（メールアドレス・電話番号）</li>
          <li>予約情報（予約日時、利用履歴等）</li>
          <li>決済関連情報（決済の可否・ステータス等の結果情報）※クレジットカード番号等は当社で保持しません</li>
          <li>端末・ブラウザ情報、IPアドレス、Cookie 等の技術情報</li>
          <li>お問い合わせ内容その他、サービス提供に必要な情報</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">3. 利用目的</h2>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1">
          <li>予約の受付・管理、サービス提供、本人確認</li>
          <li>決済処理、返金対応、利用料金の請求・入金管理</li>
          <li>各種お知らせ・問い合わせ対応、サポートの提供</li>
          <li>不正利用の防止、セキュリティの確保</li>
          <li>サービス改善、新機能開発、統計・分析（個人を識別できない形）</li>
          <li>法令・規約等に基づく対応</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">4. 第三者提供・委託</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          当社は、利用目的の達成に必要な範囲で、業務を委託し個人情報の取扱いを委託先に預託することがあります。
          委託にあたっては、適切な監督を行います。法令に基づく場合を除き、ご本人の同意なく第三者に提供しません。
        </p>
        <p className="text-gray-700 leading-relaxed">
          主な委託・連携先の例：決済事業者（PayPay）、ホスティング（Vercel）、データベース（Neon/PostgreSQL） 等
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">5. Cookie 等の利用</h2>
        <p className="text-gray-700 leading-relaxed">
          本サービスでは、利便性向上やセッション管理等のために Cookie や類似技術を利用する場合があります。
          ブラウザ設定により Cookie を無効化できますが、一部機能が利用できないことがあります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">6. 安全管理措置</h2>
        <p className="text-gray-700 leading-relaxed">
          当社は、個人情報の漏えい、滅失またはき損の防止その他の安全管理のため、アクセス制御、暗号化、ログ監査等、必要かつ適切な措置を講じます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">7. 保有期間</h2>
        <p className="text-gray-700 leading-relaxed">
          個人情報は、利用目的の達成に必要な範囲で保有し、目的達成後は適切に消去または匿名化します（法令で保存期間が定められている場合を除く）。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">8. 開示・訂正・利用停止等の請求</h2>
        <p className="text-gray-700 leading-relaxed">
          ご本人は、当社所定の手続により、保有個人データの開示、訂正、追加、削除、利用停止等を請求できます。
          contact@kango-useful-tool.comまでご連絡ください。法令に基づき、本人確認の実施や手数料のご負担をお願いする場合があります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">9. 未成年者の情報</h2>
        <p className="text-gray-700 leading-relaxed">
          未成年の方が利用者となる場合、保護者の同意を得たうえでご利用ください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">10. 匿名加工情報・統計情報の取扱い</h2>
        <p className="text-gray-700 leading-relaxed">
          個人を識別できないように加工した情報や統計情報を、サービス改善・分析等の目的で利用する場合があります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">11. 海外移転</h2>
        <p className="text-gray-700 leading-relaxed">
          システムの都合上、データが国外のサーバーに保存・移転される場合があります。適用法令に従い、適切な保護措置を講じます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">12. 法令等の遵守</h2>
        <p className="text-gray-700 leading-relaxed">
          当社は、個人情報の保護に関する法律（個人情報保護法）その他関係法令・ガイドラインを遵守します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">13. 改定</h2>
        <p className="text-gray-700 leading-relaxed">
          本ポリシーの内容は、法令改正やサービス内容の変更に伴い、必要に応じて改定することがあります。重要な変更は本サイト上で告知します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">14. お問い合わせ窓口</h2>
        <p className="text-gray-700 leading-relaxed">
          医療サービスSynaplus 個人情報問い合わせ窓口<br />
          住所：名古屋市天白区表山1-1107-1<br />
          メール：contact@kango-useful-tool.com / 電話：09029454983
        </p>
      </section>

      <div className="text-sm text-gray-600">
        <p>制定日：2025年8月25日</p>
        <p>最終改定日：2025年8月25日</p>
      </div>
    </main>
  );
}
