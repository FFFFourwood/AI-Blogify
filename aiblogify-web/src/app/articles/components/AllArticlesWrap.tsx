import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ArticleCard from "./ArticleCard";
import { ArticleCardType } from "@/utils/enums";
import { axiosFetch } from "@/utils/axios";
import { apiRequest } from "@/utils/api";

const AllArticlesWrap = () => {
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const res: any = await axiosFetch.get(apiRequest.articles.getAll);
            setArticles(res.data.docs);
            setLoading(false);
        };
        getData();
    }, []);

    return (
        <div>
            {loading && <div>Loading...</div>}
            {!loading && articles?.length == 0 && <div>No articles found.</div>}
            {!loading &&
                articles?.length > 0 &&
                articles.map((v: any, i) => {
                    return <ArticleCard key={v._id} title={v.title} description={v.description} images={v.images} date={v.createdAt} readCount={v.views} commentsCount={v.commentsCounts} categary={v.categories} likeCount={v.likes} cardType={v.type} />;
                })}
        </div>
    );
};
export default AllArticlesWrap;
