import { Inter } from "next/font/google";
import "../app/globals.css";
import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./globals.css";
import { AuthProviderWrap } from "../contexts/AuthContext";
import theme from "../theme/themeConfig";
import { Box, Container } from "@mui/material";
const inter = Inter({ subsets: ["latin"] });
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DialogProvider } from "../components/LoginDialog";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AuthProviderWrap>
                        <DialogProvider>
                            <div className="flex flex-col min-h-screen">
                                <Header />
                                <div className="mt-16">
                                    <main className="p-4">{children}</main>
                                </div>
                                <Footer />
                            </div>
                        </DialogProvider>
                    </AuthProviderWrap>
                </ThemeProvider>
            </body>
        </html>
    );
}
