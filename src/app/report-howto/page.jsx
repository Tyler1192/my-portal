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
        <h2>アセスメントAIの使い方</h2>
        <p>このページでは、アセスメントAIの使い方を説明します。有料で使い方を間違えるとお金を失うことになるので、シッカリ読んでください！</p>
        <p>　</p>
        <h3>ステップ0：利用したい日時で予約する</h3>
        <p>　</p>
        <p>このサイトのトップページはこのようになっていると思います。</p>
        <p>「予約」アイコンをクリックしてください。</p>
        <img src="/images/02toppage.png" alt="トップページの写真" className="ex-image-a" />
        <p>　</p>
        <p>予約ページはこのようになっているので、希望の時間帯を選択してください。</p>
        <img src="/images/02reservepage.png" alt="予約ページの写真" className="ex-image-a" />
        <p>　</p>    
        <p>予約は30分単位です。例えば、8/15の12:00～12:30に利用したければ、「2025-08-15T12:00」を選択してください。</p>
        <p>予約した30分間しかAIを使用することができないので、必ず予定が空いていることを確認しておいてください。</p>
        <img src="/images/02reservepage2.png" alt="予約ページの写真2" className="ex-image-a" />
        <p>　</p> 
        <p>「予約してパスワードを取得」ボタンをクリックするとPayPayで利用料（500円）を払うことができます。</p>
        <p>支払いが完了すると、下のようにパスワードが表示されます。</p>
        <img src="/images/02reservepage3.png" alt="予約ページの写真3" className="ex-image-a" />
        <p>　</p>                        
        <p>パスワードはログインに必要ですが、一度しか表示されないので、必ずメモ帳などにコピペしておいてください！</p>
        <p>予約した時間になったら、トップページの「アセスメント自動作成AI」に入り、パスワードを入力することでログインできます。</p>    
        <p>　</p>        
        <h3>ステップ1：患者情報をまとめる</h3>
        <p>　</p>
        <p>アセスメントを書く時は大きく２つのケースがあると思います。ペーパーペイシェントの場合と実際の患者さんの場合です。</p>
        <p>【ペーパーペイシェントの場合】</p>
        <img src="/images/02asesimage01.jpg" alt="ペーパーの写真" className="ex-image-a" />
        <p>　</p>
        <p>まずはペーパーペイシェントの情報が書かれているプリントの写真を撮ります。（画像は個人情報のためぼかしを入れています）</p>
        <p>カメラのアルバムで画像から文字をコピーできる機能があるので、プリントの全文章をWordなどにペーストしておきます。</p>    
        <img src="/images/02Word.png" alt="Wordの写真" className="ex-image-a" />
        <p>　</p>
        <p>こんな感じです。ペーパーがPDFで送られてくる場合もWordにコピペでOKです。</p>
        <p>ただし、文字認識の精度が低く、このままでは誤字、脱字、変な余白が多いので直します。</p>    
        <p>そこで、Chat GPTにWord全文をペーストした上で、「この文章の誤字脱字がある部分だけ適切に直し、訂正した全文をこのチャットで送ってください。ただし、勝手に内容を減らしてはいけません。」と送ってください。</p>    
        <p>Chat GPTの出力は2000字が限界なので、2000字ずつ送ってくれます。</p>    
        <p>この送られてきた文章を新しいWordファイルにコピペしましょう。</p>    
        <p>　</p>
        <p>【実際の患者さんの場合】</p>
        <p>患者さんから聞き取った情報をWordにメモしていきましょう。</p>    
        <p>情報を自分でまとめたり、きれいな文章を書く必要はありません。箇条書きでも良いので、とにかく聞き取った情報を多くメモしましょう。</p>    
        <p>　</p>
        <h3>ステップ2：「枠組み」を自動作成する</h3>
        <p>　</p>
        <p>トップページの「アセスメント自動作成AI」からログインをします。</p>    
        <p>WordにまとめたWordの文章を全てペーストしてください。</p>  
        <img src="/images/02frame11.png" alt="11の枠組みの写真" className="ex-image-a" />
        <p>　</p>  
        <p>こんな感じです。全文入力できたら「実行」を押してください。実行ボタンは1度しか押せないので注意してください。</p>
        <p>情報量が多い場合、処理に10分ほどかかることがあります。普通でも5分くらいはかかるので、結果が出るまでは何も触らずに待っていてください。</p>
        <p>スリープしたり画面を切り替えるとデータが消える可能性があるので、画面は落ちないようにしておいてください。</p>    
        <img src="/images/02frame-output.png" alt="11の枠組みの結果写真" className="ex-image-a" />
        <p>　</p>  
        <p>処理が終わると、このように分析結果が表示されます。</p>
        <p>分析結果を「全て」コピーして、新しいWordファイルにコピペしてください。</p>
        <img src="/images/02frameoutput-word.png" alt="11の枠組みの結果Word写真" className="ex-image-a" />
        <p>　</p>  
        <p>このようなファイルを作ってくれればOKです。</p>
        <p>ここまでできたら「次に進む」ボタンを押してください。後戻りできないので、しっかり確認してから次に進みましょう。</p>
        <p>　</p>
        <h3>ステップ3：Q&Aシートを自動作成する</h3>
        <p>　</p>
        <p>先ほどの出力では、解答として当てはまる情報が無ければ「なし」と出力されるようになっていました。</p>
        <p>この行程では、「なし」を消して、コンパクトなQ&Aシートを作っていきます。</p>
        <p>入力欄に、新しく作ったWordの内容を全てコピペしてください。</p>
        <img src="/images/02QAsheet.png" alt="なし削除写真" className="ex-image-a" />
        <p>　</p> 
        <p>できたら「実行」ボタンを押すと、このような出力がされます。</p>
        <img src="/images/02QAoutput.png" alt="なし削除結果写真" className="ex-image-a" />
        <p>　</p>  
        <p>また新しく白紙のWordファイルにこの結果を全てコピペしてください。</p>
        <p>ここまでできたら「次へ」ボタンを押してください。</p>
        <h3>ステップ4：枠組みごとの解釈と分析をする</h3>
        <p>　</p>
        <p>新しいWordファイルにコピペしたQ&Aの全てを入力欄にペーストして、「実行」ボタンを押してください。</p>
        <img src="/images/02step3.png" alt="解釈写真" className="ex-image-a" />
        <p>　</p> 
        <p>数分待つと下のように分析結果が表示されるので、これをコピーしていただければ、アセスメントの課題は終わりです！</p>
        <p>文頭の数字は、解釈や分析の根拠となるQ&Aの番号です。</p>        
        <img src="/images/02step3output.png" alt="解釈結果写真" className="ex-image-a" />
        <p>　</p> 
        <p>数分待っている間はやはり、むやみに画面を触らず、スリープしないようにしてください。</p>
        <p>また、トンチンカンな解釈や分析をしていることがあるので、一応チェックだけはしておいてください。また、文章として統一感がない場合も修正してください。</p>
        <p>　</p> 
        <p>これでアセスメント自動作成AIの使い方の説明はお終いです。お金がかかるので注意して使ってくださいね。</p>
      </main>

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
      `}</style>
    </>
  );
}
