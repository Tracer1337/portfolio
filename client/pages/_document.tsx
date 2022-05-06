/** @jsxImportSource @emotion/react */
import React from "react"
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext
} from "next/document"
import createEmotionServer from "@emotion/server/create-instance"
import { createEmotionCache } from "../lib/emotion"

function MyDocument(props: React.ComponentProps<typeof Document> & {
    emotionStyleTags: JSX.Element[]
}) {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap" rel="stylesheet" />
                {props.emotionStyleTags}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const originalRenderPage = ctx.renderPage

    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => function EnhanceApp(props) {
                // @ts-ignore
                return <App emotionCache={cache} {...props} />
            },
        })

    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(" ")}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ))

    return {
        ...initialProps,
        emotionStyleTags,
    }
}

export default MyDocument
