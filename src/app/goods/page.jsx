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
        <h2>新着情報</h2>
        <p>新着情報はまだありません。</p>
        <p>　</p> 
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
          content: '📘'; /* 本アイコンなどに変更可 */
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
        .image-row {
          display: flex;
          justify-content: flex-start;
          gap: 20px;
          margin: 20px 0;
        }
               
        .half-image {
          width: 200px;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        .half-image2 {
          width: 300px;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
