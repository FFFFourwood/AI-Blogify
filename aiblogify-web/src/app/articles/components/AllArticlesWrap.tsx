import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import ArticleCard from "./ArticleCard";
import { ArticleCardType } from "@/utils/enums";
import { axiosFetch } from "@/utils/axios";
import { apiRequest } from "@/utils/api";
import { stripMarkdown } from "@/utils/util";
import moment from "moment";
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
                    const desc = v.description || stripMarkdown(v.content);
                    const date = moment(v.createdAt).format("YYYY-MM-DD");
                    return <ArticleCard key={v._id} title={v.title} description={desc} images={v.images} date={date} readCount={v.views} commentsCount={v.commentsCounts} categary={v.categories} likeCount={v.likes} cardType={v.type} coverImg={v.coverImg} />;
                })}
        </div>
    );
};
export default AllArticlesWrap;
