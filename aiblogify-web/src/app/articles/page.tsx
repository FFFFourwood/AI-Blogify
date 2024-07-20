"use client";
import React from "react";
import { Breadcrumb } from "@/components/Breadcrumbs";
import { Permission } from "@/utils/permissions";

const Article: React.FC = () => {
    const breadcrumbs = [{ name: "Articles", href: "/articles" }];
    return (
        <div className="ai-blogify-content-wrap">
            <div className="flex">
                <Breadcrumb items={breadcrumbs} />
            </div>
        </div>
    );
};

export default Article;
