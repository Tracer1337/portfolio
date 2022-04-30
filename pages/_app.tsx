import React from "react"
import { CacheProvider, css, Global } from "@emotion/react"
import { AppProps } from "next/app"
import { EmotionCache } from "@emotion/cache"
import { createEmotionCache } from "../lib/emotion"
import Head from "next/head"

export type CustomAppProps = AppProps & {
    emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

export default function App(props: CustomAppProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps
    } = props

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <Global
                styles={css`
                    body {
                        margin: 0;
                        background-color: #000;
                        color: #fff;
                        font-family: 'Inter', sans-serif;
                    }
                `}
            />
            <Component {...pageProps} />
        </CacheProvider>
    )
}
