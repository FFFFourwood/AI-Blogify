import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ArticleCard from "./ArticleCard";
import { ArticleCardType } from "@/utils/enums";
// const SkeletonBox = () => {
//     return <Box width="100%"></Box>;
// };

const data = {
    title: "Article Title",
    description:
        "Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  ",
    images: ["https://ffffourwood.cn/usr/uploads/2023/08/ec2ffe7eb4fd7b156cf5ee603657c5f8.png", "https://ffffourwood.cn/usr/uploads/2023/08/8e88fb60f6bba6cc0d9c682db2164aaf.png", "https://ffffourwood.cn/usr/uploads/2023/08/ec2ffe7eb4fd7b156cf5ee603657c5f8.png"],
    date: "2021-01-01",
    readCount: 100,
    commentsCount: 111,
    comments: [
        {
            id: 1,
            content: "Comment 1",
            user: {
                id: 1,
                name: "User 1",
            },
        },
    ],
    categary: "Game",
    likeCount: 333,
    cardType: ArticleCardType.BIGIMG,
};
const data2 = {
    title: "Article Title",
    description:
        "Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  ",
    images: ["https://ffffourwood.cn/usr/uploads/2022/10/2884096240.jpeg", "https://ffffourwood.cn/usr/uploads/2023/08/8e88fb60f6bba6cc0d9c682db2164aaf.png", "https://ffffourwood.cn/usr/uploads/2023/08/ec2ffe7eb4fd7b156cf5ee603657c5f8.png"],
    date: "2021-01-01",
    readCount: 100,
    commentsCount: 111,
    comments: [
        {
            id: 1,
            content: "Comment 1",
            user: {
                id: 1,
                name: "User 1",
            },
        },
    ],
    categary: "Game",
    likeCount: 333,
    cardType: ArticleCardType.DEFAULT,
};
const data3 = {
    title: "Article Title",
    description:
        "Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  ",
    images: ["https://ffffourwood.cn/usr/uploads/2022/10/2884096240.jpeg", "https://ffffourwood.cn/usr/uploads/2023/08/8e88fb60f6bba6cc0d9c682db2164aaf.png", "https://ffffourwood.cn/usr/uploads/2023/08/ec2ffe7eb4fd7b156cf5ee603657c5f8.png"],
    date: "2021-01-01",
    readCount: 100,
    commentsCount: 111,
    comments: [
        {
            id: 1,
            content: "Comment 1",
            user: {
                id: 1,
                name: "User 1",
            },
        },
    ],
    categary: "Game",
    likeCount: 333,
    cardType: ArticleCardType.MOREIMG,
};

const data4 = {
    title: "Article Title",
    description:
        "Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  Article Description  ",
    images: ["https://ffffourwood.cn/usr/uploads/2022/10/2884096240.jpeg", "https://ffffourwood.cn/usr/uploads/2023/08/8e88fb60f6bba6cc0d9c682db2164aaf.png", "https://ffffourwood.cn/usr/uploads/2023/08/ec2ffe7eb4fd7b156cf5ee603657c5f8.png"],
    date: "2021-01-01",
    readCount: 100,
    commentsCount: 111,
    comments: [
        {
            id: 1,
            content: "Comment 1",
            user: {
                id: 1,
                name: "User 1",
            },
        },
    ],
    categary: "Game",
    likeCount: 333,
    cardType: ArticleCardType.NOIMG,
};

const ArticleWrap = () => {
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <ArticleCard {...data} />
            <ArticleCard {...data2} />
            <ArticleCard {...data3} />
            <ArticleCard {...data4} />
            <ArticleCard {...data} />
            <ArticleCard {...data} />
            <ArticleCard {...data} />
            <ArticleCard {...data} />
            <ArticleCard {...data} />
            <ArticleCard {...data} />
            <ArticleCard {...data} />
            <ArticleCard {...data} />
            <ArticleCard {...data} />
            <ArticleCard {...data} />
            <ArticleCard {...data} />
            <ArticleCard {...data} />
        </div>
    );
};
export default ArticleWrap;
