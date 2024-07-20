import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ArticleWrap from "./ArticleWrap";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function ArticleTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`atricle-tabpanel-${index}`} aria-labelledby={`atricle-tab-${index}`} {...other}>
            {value === index && <Box sx={{ pt: 3, pb: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `atricle-tab-${index}`,
        "aria-controls": `atricle-tabpanel-${index}`,
    };
}

export default function ArticleTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Latest" {...a11yProps(0)} />
                    <Tab label="Hot" {...a11yProps(1)} />
                    <Tab label="Categray" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <ArticleTabPanel value={value} index={0}>
                <ArticleWrap />
            </ArticleTabPanel>
            <ArticleTabPanel value={value} index={1}>
                Item Two
            </ArticleTabPanel>
            <ArticleTabPanel value={value} index={2}>
                Item Three
            </ArticleTabPanel>
        </Box>
    );
}
