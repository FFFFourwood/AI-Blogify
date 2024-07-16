import { GetServerSideProps } from "next";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";

const ArticlePage = ({ article }) => {
  const router = useRouter();

  // 如果页面在服务端渲染期间被阻止了，客户端会显示一个加载页面
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{article.title} - My Blog</title>
        <meta name="description" content={article.summary} />
        <meta name="keywords" content={article.tags.join(", ")} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.summary,
              author: {
                "@type": "Person",
                name: article.author,
              },
              datePublished: article.publishedAt,
              image: article.imageUrl,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://www.example.com/articles/${article.slug}`,
              },
            }),
          }}
        />
      </Head>
      <main>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params;
  const response = await axios.get(`https://api.example.com/articles/${slug}`);
  const article = response.data;

  return {
    props: { article },
  };
};

export default ArticlePage;
