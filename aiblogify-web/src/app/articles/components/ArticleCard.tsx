import * as React from "react";
import { ArticleCardType } from "@/utils/enums";
import BigImgCard from "./cards/BigImgCard";
import NoImgCard from "./cards/NoImgCard";
import MoreImgCard from "./cards/MoreImgCard";
import DefaultCard from "./cards/DefaultCard";

interface IArticleCardProps {
    title: string;
    description: string;
    images: Array<string>;
    date: string;
    readCount: number;
    commentsCount: number;
    comments: any;
    categary: string;
    likeCount: number;
    cardType: ArticleCardType;
}

export default function ArticleCard(cardData: IArticleCardProps) {
    const renderCard = () => {
        switch (cardData.cardType) {
            case ArticleCardType.BIGIMG:
                return <BigImgCard {...cardData} />;
            case ArticleCardType.DEFAULT:
                return <DefaultCard {...cardData} />;
            case ArticleCardType.MOREIMG:
                return <MoreImgCard {...cardData} />;
            case ArticleCardType.NOIMG:
                return <NoImgCard {...cardData} />;
            default:
                return <DefaultCard {...cardData} />;
        }
    };

    return <div className="duration-350 transform origin-left hover:scale-102 hover:translate-x-1 text-white">{renderCard()}</div>;
}
