import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";

const StyledTypography = styled(Typography)({
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
});
const BigImgCard = (props: any) => {
    return (
        <Card sx={{ width: "100%" }} className="mb-5" variant="outlined">
            <CardActionArea>
                <CardMedia component="img" image={props.coverImg} alt={props.title} className="transition transform duration-350 hover:scale-102 hover:opacity-85 h-[130] sm:h-[180px] md:h-[240px] xl:h-[280px]" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <div className="flex flex-wrap">
                        <Chip label={props.date} size="small" icon={<WatchLaterOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                        <Chip label={props.readCount} size="small" icon={<VisibilityOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                        <Chip label={props.commentsCount} size="small" icon={<InsertCommentOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                        <Chip label={props.likeCount} size="small" icon={<FavoriteBorderOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                        {props.categaries.map((v: any) => (
                            <Chip label={v.name} key={v._id} size="small" icon={<ClassOutlinedIcon fontSize="small" />} className="mr-2 mb-2" />
                        ))}
                    </div>

                    <StyledTypography variant="body2" color="text.secondary">
                        {props.description}
                    </StyledTypography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default BigImgCard;
