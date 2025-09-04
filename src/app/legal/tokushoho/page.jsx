// src/app/legal/tokushoho/page.jsx

export const metadata = {
  title: '特定商取引法に基づく表記',
  description: '本サービスに関する特定商取引法の表示ページです。',
};

export default function TokuShohoPage() {
  return (
    <main className="max-w-[880px] mx-auto my-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-extrabold mb-4">特定商取引法に基づく表記</h1>

      <dl className="grid [grid-template-columns:220px_1fr] gap-x-5 gap-y-3 md:[grid-template-columns:1fr]">
        <dt className="font-bold text-gray-800">販売業者</dt>
        <dd className="m-0 text-gray-900 leading-relaxed">医療サービスSynaplus</dd>

        <dt className="font-bold text-gray-800">運営責任者</dt>
        <dd className="m-0">本田泰良</dd>

        <dt className="font-bold text-gray-800">所在地</dt>
        <dd className="m-0">468-0069・名古屋市天白区表山1-1107-1</dd>

        <dt className="font-bold text-gray-800">電話番号</dt>
        <dd className="m-0">09029454983</dd>
        <dd className="m-0">電話に出ることが困難であるため、メールでお問い合わせください。</dd>

        <dt className="font-bold text-gray-800">メールアドレス</dt>
        <dd className="m-0">contact@kango-useful-tool.com</dd>

        <dt className="font-bold text-gray-800">サイトURL</dt>
        <dd className="m-0">https://my-portal-i8rt-git-staging-tyler-hondas-projects.vercel.app</dd>

        <dt className="font-bold text-gray-800">販売価格</dt>
        <dd className="m-0">枠 450円・消費税込</dd>

        <dt className="font-bold text-gray-800">商品代金以外の必要料金</dt>
        <dd className="m-0">通信に関わるインターネット接続料金・通信料はお客様負担。決済手数料は当社負担。</dd>

        <dt className="font-bold text-gray-800">支払方法</dt>
        <dd className="m-0">PayPay（オンライン決済）。</dd>

        <dt className="font-bold text-gray-800">支払時期</dt>
        <dd className="m-0">予約手続き時に即時決済となります。</dd>

        <dt className="font-bold text-gray-800">役務の提供時期</dt>
        <dd className="m-0">決済完了後に予約確定。予約時間にサービスを提供します。</dd>

        <dt className="font-bold text-gray-800">申込みの有効期限</dt>
        <dd className="m-0">決済リンクの有効期限内にお支払いがない場合は自動的に無効となります。</dd>

        <dt className="font-bold text-gray-800">キャンセル・変更</dt>
        <dd className="m-0">キャンセルは返金不可となります。</dd>

        <dt className="font-bold text-gray-800">返金について</dt>
        <dd className="m-0">上記ポリシーに基づき返金可否を判断。返金は原則同一手段で行います（手数料差引の場合あり）。</dd>

        <dt className="font-bold text-gray-800">動作環境</dt>
        <dd className="m-0">最新の主要ブラウザ（Chrome / Safari / Edge / Firefox）。</dd>

        <dt className="font-bold text-gray-800">特別条件（クーリング・オフ）</dt>
        <dd className="m-0">オンラインの役務提供につきクーリング・オフの適用対象外です。</dd>

        <dt className="font-bold text-gray-800">問い合わせ窓口</dt>
        <dd className="m-0">本田泰良（担当） / contact@kango-useful-tool.com / 09029454983</dd>
      </dl>

      <p className="mt-5 text-xs text-gray-500"></p>
    </main>
  );
}
