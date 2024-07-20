import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Description } from "@mui/icons-material";
import { ArticleCardType } from "@/utils/enums";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

const StyledTypography = styled(Typography)({
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
});

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
    const bigImgCard = () => {
        let imgSrc = "";
        if (cardData.images && cardData.images.length > 0) {
            imgSrc = cardData?.images[0];
        }
        return (
            <Card sx={{ width: "100%" }} className="mb-5">
                <CardActionArea>
                    <CardMedia component="img" image={imgSrc} alt={cardData.title} sx={{ maxHeight: "400px", minHeight: "200px" }} className="transition transform duration-350 hover:scale-102 hover:opacity-85" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {cardData.title}
                        </Typography>
                        <div className="flex flex-wrap">
                            <Chip label={cardData.date} size="small" icon={<WatchLaterOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                            <Chip label={cardData.readCount} size="small" icon={<VisibilityOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                            <Chip label={cardData.commentsCount} size="small" icon={<InsertCommentOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                            <Chip label={cardData.likeCount} size="small" icon={<FavoriteBorderOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                            <Chip label={cardData.categary} size="small" icon={<ClassOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                        </div>

                        <StyledTypography variant="body2" color="text.secondary">
                            {cardData.description}
                        </StyledTypography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    };

    const moreImgCard = () => {
        let imgSrc = "";
        if (cardData.images && cardData.images.length > 0) {
            imgSrc = cardData?.images[0];
        }
        return (
            <Card sx={{ width: "100%" }} className="mb-5">
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {cardData.title}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} className="mt-5 mb-2">
                            <Grid container spacing={1}>
                                {cardData.images.map((card) => {
                                    return (
                                        <Grid xs={4} key={card}>
                                            <CardMedia component="img" image={card} alt={cardData.title} sx={{ maxHeight: "100%", minHeight: "100%" }} className="transition transform duration-350 hover:scale-102 hover:opacity-85" />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                        <div className="flex flex-wrap">
                            <Chip label={cardData.date} size="small" icon={<WatchLaterOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                            <Chip label={cardData.readCount} size="small" icon={<VisibilityOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                            <Chip label={cardData.commentsCount} size="small" icon={<InsertCommentOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                            <Chip label={cardData.likeCount} size="small" icon={<FavoriteBorderOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                            <Chip label={cardData.categary} size="small" icon={<ClassOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                        </div>
                        <StyledTypography variant="body2" color="text.secondary">
                            {cardData.description}
                        </StyledTypography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    };

    const defaultCard = () => {
        let imgSrc = "";
        if (cardData.images && cardData.images.length > 0) {
            imgSrc = cardData?.images[0];
        }
        return (
            <Card sx={{ width: "100%" }} className="mb-5">
                <CardActionArea>
                    <Box className="flex flex-row">
                        <CardMedia component="img" image={imgSrc} alt={cardData.title} sx={{ width: { xs: "30%", md: "27%" } }} className="transition transform duration-350 hover:scale-102 hover:opacity-85" />
                        <CardContent className="flex flex-col">
                            <Typography gutterBottom variant="h5" component="div">
                                {cardData.title}
                            </Typography>
                            <div className="flex flex-wrap">
                                <Chip label={cardData.date} size="small" icon={<WatchLaterOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                                <Chip label={cardData.readCount} size="small" icon={<VisibilityOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                                <Chip label={cardData.commentsCount} size="small" icon={<InsertCommentOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                                <Chip label={cardData.likeCount} size="small" icon={<FavoriteBorderOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                                <Chip label={cardData.categary} size="small" icon={<ClassOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                            </div>

                            <StyledTypography variant="body2" color="text.secondary">
                                {cardData.description}
                            </StyledTypography>
                        </CardContent>
                    </Box>
                </CardActionArea>
            </Card>
        );
    };

    const noImgCard = () => {
        let imgSrc = "";
        if (cardData.images && cardData.images.length > 0) {
            imgSrc = cardData?.images[0];
        }
        return (
            <Card sx={{ width: "100%" }} className="mb-5">
                <CardActionArea>
                    <Box className="flex">
                        <CardContent className="flex flex-col">
                            <Typography gutterBottom variant="h5" component="div">
                                {cardData.title}
                            </Typography>
                            <div className="flex flex-wrap">
                                <Chip label={cardData.date} size="small" icon={<WatchLaterOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                                <Chip label={cardData.readCount} size="small" icon={<VisibilityOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                                <Chip label={cardData.commentsCount} size="small" icon={<InsertCommentOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                                <Chip label={cardData.likeCount} size="small" icon={<FavoriteBorderOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                                <Chip label={cardData.categary} size="small" icon={<ClassOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                            </div>

                            <StyledTypography variant="body2" color="text.secondary">
                                {cardData.description}
                            </StyledTypography>
                        </CardContent>
                    </Box>
                </CardActionArea>
            </Card>
        );
    };

    const renderCard = () => {
        switch (cardData.cardType) {
            case ArticleCardType.BIGIMG:
                return bigImgCard();
            case ArticleCardType.DEFAULT:
                return defaultCard();
            case ArticleCardType.MOREIMG:
                return moreImgCard();
            case ArticleCardType.NOIMG:
                return noImgCard();
            default:
                return defaultCard();
        }
    };

    return <div className="duration-350 transform origin-left hover:scale-102 hover:translate-x-1 text-white">{renderCard()}</div>;
}
