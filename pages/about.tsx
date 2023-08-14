import type { NextPage } from "next";
import Head from "next/head";

const pageTitle = "このサイトについて";

const ShowSiteGuide: NextPage = () => {
  return (
    <>
      <Head>
        <title>about</title>
      </Head>
      <article className="markdown">
        <h1>{pageTitle}</h1>
        <p></p>
        <h2>作者情報</h2>
        <p>
          ソフトウェア開発をしています。
          主にRuby/Railsを使用したWebアプリケーション開発に関わっています。
        </p>
        <p>
          このサイトは、個人的な生活や技術のブログとして運営しています。
        </p>
        <p>
          GitHub:{" "}
          <a href="https://github.com/uchinokot">uchinokot</a>
        </p>
      </article>
    </>
  );
};

export default ShowSiteGuide;
