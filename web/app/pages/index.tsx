import React from "react";
import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import axios from "axios";

const HomePage = ({ articles }) => {
  return (
    <Layout showHeader={true} showFooter={true} showSidebar={true}>
      <h1 className="text-3xl font-bold">Welcome to My Blog</h1>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
        </div>
      ))}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get("https://api.example.com/articles");
  const articles = response.data;

  return {
    props: { articles },
  };
};

export default HomePage;
