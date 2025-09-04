'use client';

export default function FlowchartHowTo() {
  return (
    <>
      <header className="l-header">
        <div className="l-mainVisual">
          <div className="l-mainVisual__in">
            <h1>
              <img
                src="/header2.png"
                className="c-mainVisual__img"
                width={1000}
                height={170}
                alt="サービスのヘッダー"
              />
            </h1>
          </div>
        </div>
      </header>

      <main className="l-content">
        <h2>このサイトについて</h2>
        <p>　</p>
        <p>看護実習で大量の課題があるのって大変ではありませんか？</p>
        <p>アセスメントと関連図を書くだけで数日潰れるなんて嫌になりますよね</p>
        <p>課題に10時間かかることはよくあるでしょうが、その時間バイトしていれば１万円になっていたわけです</p>
        <p>世の中こんなに便利になっているのに、看護だけ楽にならないなんておかしいじゃないか！</p>
        <p>そう感じて、アセスメントと関連図を作成するためのAIを開発することにしました</p>
        <p>私が提供する便利ツールは次の２つです</p>
        <p>　</p>
        <h3>アセスメント自動作成AI</h3>
        <p>　</p>
        <p>アセスメントは大量の患者情報を整理する必要がある課題です</p>
        <p>Chat GPTにアセスメントをやらせてみようとしたことがある方なら分かるかもしれませんが、無料版は記憶力が6000字程度なので、膨大な患者情報を入力すると、よく分からない回答がきます</p>
        <p>有料版のChat GPTは記憶力はクリアしていますが、看護用のAIではないので、求めるような答えはくれません</p>
        <p>その点、私のアセスメント自動作成AIは、Chat GPTよりも安く、高い精度でアセスメントを行えます</p>
        <p>患者から聞いた情報やペーパーペイシェントの情報をコピペして、実行ボタンを押すと項目ごとに振り分けて、評価までしてくれます</p>
        <p>アセスメントはとても大変な課題でAIの処理量が多いため５００円だけ取らせていただきます🙇</p>
        <p>関連図作成は無料なのですが、アセスメントAIは無料にすると私が赤字になってしまいますので、ご理解お願いします</p>
        <p>　</p> 
        <h3>関連図描画ツール</h3>
        <p>　</p>
        <p>関連図を作るのにパワポを使ったり、有料のアプリを使ったりしている人が多く何かと不便です</p>
        <p>このサイトでは、インターネット上で完全無料で使える関連図描画ツールを提供しています</p>
        <p>直感的な操作で、楽に関連図を作れるようになったので、ぜひお使いください</p>
        <p>また、今後はアセスメントAIと連携することで、関連図も自動で作ってしまおう！と企画しているのでご期待お願いします</p>
        <img src="/images/plus-comp.png" alt="完成" className="ex-image-f" width="500" />          
      </main>
      
      <footer className="l-footer">
        <nav className="l-footer__nav">
          <a href="/legal/tokushoho">特定商取引法に基づく表記</a>
          <a href="/privacy">プライバシーポリシー</a>
          <a href="/terms">利用規約</a>
          <a href="/refund">返品・キャンセルポリシー</a>
        </nav>
        <small>© {new Date().getFullYear()} 医療サービスSynaplus</small>
      </footer>

      <style jsx>{`
        .l-mainVisual {
          background-color: #f0f8ff;
          padding: 0;
          margin: 0;
          text-align: center;
        }

        .c-mainVisual__img {
          display: block;
          margin: 0 auto;
          width: 100%;
          max-width: 1600px;
          height: auto;
        }

        .l-content {
          max-width: 720px;
          margin: 40px auto;
          padding: 40px;
          font-size: 16px;
          line-height: 1.8;
          color: #333;
          background-color: #fff8dc;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(255, 222, 173, 0.3);
        }

        .l-content h2 {
          font-size: 30px;
          font-weight: bold; 
          margin-top: 60px;
          margin-bottom: 24px;
          color: #000000; /* 落ち着いたブラウン */
          border-bottom: 3px solid #d2691e; /* アンダーラインで区切り感 */
          padding-bottom: 8px;
          position: relative;
        }
        
        /* お好みでアイコンや飾りを追加したい場合 */
        .l-content h2::before {
          content: '❓'; /* 本アイコンなどに変更可 */
          margin-right: 8px;
          font-size: 24px;
        }
        

        .l-content h3 {
          font-size: 20px;
          margin-top: 40px;
          margin-bottom: 16px;
          color: #5c4033;
          border-left: 6px solid #d2691e;
          padding-left: 12px;
          background-color: #fff3e0;
          border-radius: 4px;
          box-shadow: 0 0 0 1px #d6a875; /* 薄茶の外枠ライン */
        }
        
        .l-content p {
          margin-bottom: 1em;
        }
        
        .l-footer {
          border-top: 1px solid #eee;
          padding: 24px 16px;
          background: #fafafa;
          text-align: center;
        }
        .l-footer__nav {
          display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;
          margin-bottom: 8px;
        }
        .l-footer__nav a { color: #333; text-decoration: none; }
        .l-footer__nav a:hover { text-decoration: underline; }           
      `}</style>
    </>
  );
}
