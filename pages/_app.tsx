import * as React from "react"
import Head from "next/head"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CacheProvider } from "@emotion/react"
import theme from "../lib/theme"
import { createEmotionCache } from "../lib/emotion"

const clientSideEmotionCache = createEmotionCache()

export default function App(props: any) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    )
}
