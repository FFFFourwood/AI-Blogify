import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import ArticleCard from "./ArticleCard";
import { ArticleCardType } from "@/utils/enums";
import { axiosFetch } from "@/utils/axios";
import { apiRequest } from "@/utils/api";
import { stripMarkdown } from "@/utils/util";
import moment from "moment";
import LoadingCard from "./cards/LoadingCard";
import InfiniteScroll from "react-infinite-scroller";
import { v4 as uuidv4 } from "uuid";
const AllArticlesWrap = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const fetchUrl = (page: number) => {
        return apiRequest.articles.getAll + `?page=${page}`;
    };

    useEffect(() => {
        const getData = async () => {
            const res: any = await axiosFetch.get(fetchUrl(1));
            setArticles(res.data.docs);
            setInitLoading(false);
        };
        getData();
    }, []);

    const getMoreData = async (page: number) => {
        try {
            const res = await axiosFetch.get(fetchUrl(page));
            setArticles([...articles, ...res.data.docs]);
            setHasMore(res.data.hasNextPage);
        } catch (error) {}
    };

    return (
        <div>
            {initLoading && <LoadingCard key={uuidv4()} />}
            {initLoading && <LoadingCard key={uuidv4()} />}
            {!initLoading && articles?.length == 0 && <div>No articles found.</div>}
            {!initLoading && articles?.length > 0 && (
                <InfiniteScroll pageStart={1} loadMore={getMoreData} hasMore={hasMore} threshold={20} loader={<LoadingCard key={uuidv4()} />} key={uuidv4()}>
                    {articles.map((v: any, i) => {
                        const desc = v.description || stripMarkdown(v.content);
                        const date = moment(v.createdAt).format("YYYY-MM-DD");
                        const type = v.type == ArticleCardType.DEFAULT && v.images?.length < 1 ? ArticleCardType.NOIMG : v.type;
                        return <ArticleCard key={uuidv4()} title={v.title} description={desc} images={v.images} date={date} readCount={v.views} commentsCount={v.commentsCounts} categaries={v.categories} likeCount={v.likes} cardType={type} coverImg={v.coverImg} />;
                    })}
                </InfiniteScroll>
            )}
        </div>
    );
};
export default AllArticlesWrap;
