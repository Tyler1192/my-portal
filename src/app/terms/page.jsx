// src/app/terms/page.jsx

export const metadata = {
  title: '利用規約',
  description: '本サービスの利用条件を定める利用規約です。',
};

export default function TermsPage() {
  return (
    <main className="max-w-[880px] mx-auto my-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-extrabold mb-6">利用規約</h1>

      <p className="mb-6 text-gray-700 leading-relaxed">
        医療サービスSynaplus（以下「当社」といいます。）は、当社が提供する本サービス（以下「本サービス」といいます。）の利用条件を、以下のとおり本利用規約（以下「本規約」といいます。）として定めます。
        本サービスの利用者（以下「ユーザー」といいます。）は、本規約に同意のうえ本サービスを利用するものとします。
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">第1条（適用・変更）</h2>
        <p className="text-gray-700 leading-relaxed">
          1. 本規約は、本サービスの提供および利用に関する当社とユーザーとの一切の関係に適用されます。<br/>
          2. 当社は、必要に応じて本規約を変更できるものとします。重要な変更がある場合は、本サイト上で周知します。変更後にユーザーが本サービスを利用した場合、当該変更に同意したものとみなします。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">第2条（利用環境）</h2>
        <p className="text-gray-700 leading-relaxed">
          本サービスの利用に必要な通信機器・ソフトウェア・通信手段等は、ユーザーの費用と責任において用意・維持するものとします。通信費用はユーザーが負担します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">第3条（アカウント・本人確認）</h2>
        <p className="text-gray-700 leading-relaxed">
          本サービスの一部機能の利用にあたり、当社がアカウント登録や本人確認（メール認証等）を求める場合があります。ユーザーは、登録情報を最新かつ正確に保つものとします。
          不正利用が疑われる場合、当社はアカウントの一時停止・削除等の措置を講じることができます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">第4条（予約・料金・支払）</h2>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1">
          <li>予約：ユーザーは、表示された空き枠から希望の時間を選択し、決済の完了をもって予約申込みを行います。</li>
          <li>料金：各ページに税込価格を表示します（例：1枠 500円・消費税込）。</li>
          <li>支払方法：PayPay（オンライン決済）。決済は予約手続き時に即時に行われます。</li>
          <li>成立：当社が決済の完了（<code>COMPLETED</code>）を確認し、予約確定画面にてパスワードを表示した時点で契約が成立します。</li>
          <li>未完了：期限内に決済が完了しない場合、予約は自動的に無効となります。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">第5条（キャンセル・変更・返金）</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          キャンセル・変更・返金はいかなる場合でも受け付けません。
        </p>
        <p className="text-gray-700"><a className="underline" href="/refund">返品・キャンセルポリシー</a> をご確認ください。</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">第6条（禁止事項）</h2>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-1">
          <li>法令・公序良俗に違反する行為</li>
          <li>不正アクセス、システムへの過度な負荷、リバースエンジニアリング等</li>
          <li>第三者の権利（知的財産権・プライバシー等）を侵害する行為</li>
          <li>当社や他のユーザーへの誹謗中傷・迷惑行為</li>
          <li>本サービスの運営を妨げる行為、虚偽の情報提供</li>
          <li>その他、当社が不適切と判断する行為</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">第7条（知的財産権）</h2>
        <p className="text-gray-700 leading-relaxed">
          本サービスに関する一切の知的財産権は当社または正当な権利者に帰属します。ユーザーは、本サービスを本規約の範囲内でのみ利用できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">第8条（保証の否認・免責）</h2>
        <p className="text-gray-700 leading-relaxed">
          当社は、本サービスにつき、正確性・有用性・特定目的適合性等いかなる保証もしません。
          当社は、ユーザーの損害（機会損失・データ消失・間接損害等を含む）について、一切の責任を負いません。
          ただし、消費者契約法その他強行法規により免責が制限される場合、当社の債務不履行または不法行為による責任は、ユーザーが当該損害発生月に当社に実際に支払った対価の総額を上限とします（当社の故意または重過失がある場合を除く）。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">第9条（提供の中断・変更・終了）</h2>
        <p className="text-gray-700 leading-relaxed">
          当社は、メンテナンス、システム障害、法令対応、事業判断等により、本サービスの全部または一部を中断・変更・終了できるものとします。
          中断・変更・終了によりユーザーに損害が生じても、当社は一切の責任を負いません。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">第10条（個人情報の取扱い）</h2>
        <p className="text-gray-700 leading-relaxed">
          当社によるユーザーの個人情報の取扱いは、<a className="underline" href="/privacy">プライバシーポリシー</a> に従います。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">第11条（準拠法・合意管轄）</h2>
        <p className="text-gray-700 leading-relaxed">
          本規約の準拠法は日本法とします。本サービスに関して当社とユーザーの間に紛争が生じた場合、名古屋市天白区を管轄する地方裁判所を第一審の専属的合意管轄裁判所とします。
        </p>
      </section>

      <div className="text-sm text-gray-600">
        <p>制定日：2025年8月25日</p>
        <p>最終改定日：2025年8月25日</p>
      </div>
    </main>
  );
}
