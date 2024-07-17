import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../../styles/theme";
import { AppProps } from "next/app";
import { EmotionCache } from "@emotion/react";

type MyAppProps = AppProps & {
	emotionCache: typeof EmotionCache;
};

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="theme-color" content={theme.palette.primary.main} />
					<link rel="shortcut icon" href="/favicon.ico" />
					<style>{`body { margin: 0; font-family: Roboto, sans-serif; }`}</style>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async (ctx) => {
	const originalRenderPage = ctx.renderPage;

	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
		});

	const initialProps = await Document.getInitialProps(ctx);

	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style: { key: React.Key | null | undefined; ids: any[]; css: any }) => <style data-emotion={`${style.key} ${style.ids.join(" ")}`} key={style.key} dangerouslySetInnerHTML={{ __html: style.css }} />);

	return {
		...initialProps,
		styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
	};
};

export default MyDocument;