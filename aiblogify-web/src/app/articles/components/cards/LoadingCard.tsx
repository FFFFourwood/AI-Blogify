import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)({
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
});

export default function LoadingCard() {
    return (
        <Card sx={{ width: "100%" }} className="mb-5 ai-blogify-article-card loading-card" variant="outlined">
            <CardActionArea>
                <Skeleton variant="rounded" width={"100%"} className="ai-blogify-article-img-card" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <Skeleton />
                    </Typography>
                    <div className="flex">
                        <Skeleton variant="rounded" width={80} height={25} className="mr-2 mb-2" />
                        <Skeleton variant="rounded" width={50} height={25} className="mr-2 mb-2" />
                        <Skeleton variant="rounded" width={50} height={25} className="mr-2 mb-2" />
                        <Skeleton variant="rounded" width={80} height={25} className="mr-2 mb-2" />
                    </div>

                    <StyledTypography variant="body2" color="text.secondary">
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </StyledTypography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
