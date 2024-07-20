import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";

interface BreadcrumbItem {
    name: string;
    href?: string;
}
interface Props {
    items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: Props) => {
    return (
        <div role="presentation" className="p-1">
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" sx={{ display: "flex", alignItems: "center" }} color="inherit" href="/">
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    MUI
                </Link>
                {items.length > 0 &&
                    items.map((item: BreadcrumbItem, index) => (
                        <Link underline="hover" color={index + 1 == items.length ? "text.primary" : "inherit"} href={item.href} key={`key_${item.name}`}>
                            {item.name}
                        </Link>
                    ))}
            </Breadcrumbs>
        </div>
    );
};
