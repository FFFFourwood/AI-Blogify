"use client";
import React from "react";
import { Breadcrumb } from "@/components/Breadcrumbs";
import { Permission } from "@/utils/permissions";
import ArticleTabs from "./components/ArticleTabs";
import Box from "@mui/material/Box";
import SideArea from "./components/SideArea";

const Article: React.FC = () => {
    const breadcrumbs = [{ name: "Articles", href: "/articles" }];
    return (
        <div className="ai-blogify-content-wrap">
            <div className="">
                <Breadcrumb items={breadcrumbs} />
                <Box className="flex">
                    <ArticleTabs />
                    <SideArea />
                </Box>
            </div>
        </div>
    );
};

export default Article;
