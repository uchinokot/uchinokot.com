import Link from "next/link";
import Head from "next/head";
import { ArticleData, getSortedArticlesData } from "../lib/articles";
import Time from "../components/Time";

export default function Home({ allArticlesData }: { allArticlesData: ArticleData[] }) {
  return (
    <>
      <Head>
        <title>uchinokot.com</title>
      </Head>
      <section>
        <p>
          <Link href="/about">uchinokot</Link>のウェブサイトです。
        </p>
      </section>
      <section className="mt-12">
        <ul>
          {allArticlesData.map(({ id, title, date }) => (
            <li key={id} className="mb-4">
              <Time date={date} />
              <Link className="text-xl" href={`/articles/${id}`}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const allArticlesData = getSortedArticlesData();
  return {
    props: {
      allArticlesData,
    },
  };
}
