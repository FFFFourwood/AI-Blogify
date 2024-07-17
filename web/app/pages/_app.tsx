import * as React from "react";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../../styles/theme";
import "../../styles/globals.css";
import { AuthProvider } from "../../contexts/AuthContext";
import Layout from "../../components/Layout";

const clientSideEmotionCache = createEmotionCache();

interface IMyAppProps extends AppProps {
	emotionCache?: EmotionCache;
	Component: AppProps["Component"] & {
		showHeader?: boolean;
		showFooter?: boolean;
		showSidebar?: boolean;
	};
}

const MyApp: React.FC<IMyAppProps> = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {
	const { showHeader = true, showFooter = true, showSidebar = true } = Component;

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AuthProvider>
					<Layout showHeader={showHeader} showFooter={showFooter} showSidebar={showSidebar}>
						<Component {...pageProps} />
					</Layout>
				</AuthProvider>
			</ThemeProvider>
		</CacheProvider>
	);
};

export default MyApp;
