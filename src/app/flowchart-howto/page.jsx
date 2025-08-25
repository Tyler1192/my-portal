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
        <h2>関連図描画ツールの使い方</h2>
        <p>このページでは、関連図描画ツールの使い方を説明します。直感的な操作なので、説明を見なくても、とりあえず使ってみるのもありです</p>
        <p>使い方動画もあるので、文章が読むのが面倒くさい学生さんや、見た方が分かりやすい学生さんは、動画をご視聴ください</p>
        <div className="video-container">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/I61gjxZj5N0"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>        
        <p>　</p>
        <h3>ステップ1：ノードを追加する</h3>
        <p>　</p>
        <p>「ノードを追加」ボタンをクリックすると新しいノードが追加されます</p>
        <p>他にも ↓ このような種類のノードがあります</p>
        <img src="/images/plus-button-variation.png" alt="ボタンの種類" className="ex-image-a" />
        <p>　</p>
        <p>関連図にはローカルルールがあるので、ぜひノードを使い分けてください</p>
        <p>　</p>
        <h3>ステップ2：文字を入力する</h3>
        <p>　</p>
        <p>ノードをクリックすると文字を入力できるようになります</p>    
        <p>患者情報などを入れていきましょう！</p>  
        <img src="/images/plus-fill.png" alt="文字入れ" className="ex-image-b" width="200" /> 
        <p>　</p>  
        <h3>ステップ3：ノードを接続する</h3>
        <p>　</p>
        <p>枠の中点にカーソルを合わせると、カーソルが十字になります</p>
        <div className="image-row">
          <img
            src="/images/node-edge1.png"
            alt="画像1"
            className="half-image"
          />
          <img
            src="/images/node-edge2.png"
            alt="画像2"
            className="half-image"
          />
        </div>  
        <p>　</p> 
        <p>その状態でドラッグして繋ぎたいノードに持っていくと線をつなげます</p>
        <div className="image-row">
          <img
            src="/images/node-connect1.png"
            alt="画像1"
            className="half-image2"
          />
          <img
            src="/images/node-connect2.png"
            alt="画像2"
            className="half-image2"
          />
        </div>          
        <p>　</p> 
        <p>上下左右どこからでもつなぐことができます</p>
        <img src="/images/plus-4direction.png" alt="多方向" className="ex-image-c" width="500" /> 
        <p>　</p> 
        <h3>ステップ4：矢印の変更</h3>
        <p>　</p>
        <p>つないだ線を右クリックすると矢印になります。矢印を右クリックすると点線矢印になり、さらに右クリックすると、矢印は消えます</p>
        <img src="/images/plus-directionvari.png" alt="矢印" className="ex-image-d" width="500" /> 
        <p>　</p> 
        <h3>ステップ5：オリジナル矢印にしたい場合</h3>
        <p>　</p>
        <p>矢印が自分の思うように引けなかった場合は分岐ノードを使いましょう</p>
        <img src="/images/plus-original1.png" alt="画像1" className="ex-image-e" width="500" />  
        <p>　</p>        
        <p>大きい黒い点の分岐ノードの位置を動かすことで、どのような矢印でも引けるようになります。</p>
        <p>矢印を引き終わったら、分岐ノードを右クリックして「キャンセル」を選択することで、分岐ノードを小さくできます</p>
        <img src="/images/plus-original2.png" alt="画像2" className="ex-image-e" width="500" />  
        <p>　</p> 
        <h3>ステップ6：好きに配置して保存</h3>
        <p>　</p>
        <p>ノードは右クリックで消すことができます。ドラッグで好きなように配置できたら、スクショして保存しましょう！（画像は適当につないでみたやつです）</p>
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
