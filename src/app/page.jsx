'use client';

import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>関連図作成・アセスメント自動作成AI｜看護学生のための便利ツール</title>
        <meta name="description" content="関連図作成ツールとアセスメントAIで作業時間を短縮しましょう" />
      </Head>

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

      <div className="l-menu">
        <ul className="l-menu__list">
          <li className="l-menu__item">
            <a href="/about">
              <img src="/icons/about.png" alt="このサイトについて" className="menu-icon" />
              このサイトについて
            </a>
          </li>
          <li className="l-menu__item">
            <a href="/flowchart-howto">
              <img src="/icons/flowchart-howto.png" alt="関連図作成の使い方" className="menu-icon" />
              関連図作成の使い方
            </a>
          </li>
          <li className="l-menu__item">
            <a href="/report-howto">
              <img src="/icons/report-howto.png" alt="アセスメントAIの使い方" className="menu-icon" />
              アセスメントAIの使い方
            </a>
          </li>
          <li className="l-menu__item">
            <a href="/bbs">
              <img src="/icons/bbs.png" alt="掲示板" className="menu-icon" />
              掲示板
            </a>
          </li>
          <li className="l-menu__item">
            <a href="/goods">
              <img src="/icons/goods.png" alt="新着情報" className="menu-icon" />
              新着情報
            </a>
          </li>
          <li className="l-menu__item">
            <a href="/flowchart">
              <img src="/icons/flowchart.png" alt="関連図作成" className="menu-icon" />
              関連図作成
            </a>
          </li>
          <li className="l-menu__item">
            <a href="/report-generator">
              <img src="/icons/report.png" alt="アセスメント自動作成AI" className="menu-icon" />
              アセスメント自動作成AI
            </a>
          </li>
          <li className="l-menu__item">
            <a href="/contact">
              <img src="/icons/contact.png" alt="お問い合わせ" className="menu-icon" />
              お問い合わせ
            </a>
          </li>
        </ul>
      </div>

      <main className="l-content">
        <h2>課題をもっとラクにしましょう！</h2>
        <p>
          このサイトでは、関連図作成ツールと、アセスメント自動作成AIを提供しています
          使い方ページもご用意しているので、初めての方でも安心してご利用いただけます
        </p>
        <p>
          時間がかかる課題をサクッとこなして、自分の時間を作りましょう！
        </p>
        <p>　</p>
        <p>
          ※アセスメント自動作成AIは近日公開します
        </p>
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

        .l-menu {
          background-color: #f8f8f8;
          padding: 20px 0;
          border-top: 1px solid #ddd;
        }

        .l-menu__list {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          list-style: none;
          padding: 0;
          margin: 0 auto;
          max-width: 1200px;
        }

        .l-menu__item {
          padding: 10px 15px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          transition: background 0.2s;
        }

        .l-menu__item:hover {
          background-color: #eef5ff;
        }

        .l-menu__item a {
          text-decoration: none;
          color: #333;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .menu-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 8px;
        }

        .l-content {
          max-width: 720px;
          margin: 40px auto;
          padding: 40px;
          font-size: 16px;
          line-height: 1.8;
          color: #333;
        
          background-color: #fff8dc; /* やさしいクリーム色（コーンシルク） */
          border-radius: 12px;        /* 丸みのある角 */
          box-shadow: 0 4px 8px rgba(255, 222, 173, 0.3); /* 明るい影で立体感 */
        }
        

        .l-content h2 {
          font-size: 24px;
          margin-bottom: 16px;
        }

        .l-content p {
          margin-bottom: 1em;
        }
      `}</style>
    </>
  );
}
