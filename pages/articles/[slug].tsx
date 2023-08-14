import Head from "next/head";
import { getArticleData, getAllArticleTitles } from "../../lib/articles";
import Time from "../../components/Time";

type ArticleProps = {
  articleData: {
    title: string;
    date: string;
    contentHtml: string;
  };
};

const Article = ({ articleData }: ArticleProps) => {
  return (
    <>
      <Head>
        <title>{articleData.title}</title>
      </Head>
      <Time date={articleData.date} />
      <h1 className="text-3xl font-bold mt-2 mb-4">{articleData.title}</h1>
      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: articleData.contentHtml }}
      />
    </>
  );
};

export async function getStaticPaths() {
  const paths = getAllArticleTitles();
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: any) {
  const articleData = await getArticleData(params.slug as string);
  return {
    props: {
      articleData,
    },
  };
};

export default Article;
