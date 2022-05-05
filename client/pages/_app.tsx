/** @jsxImportSource @emotion/react */
import { CacheProvider, css, Global } from "@emotion/react"
import App, { AppContext, AppProps } from "next/app"
import Head from "next/head"
import { EmotionCache } from "@emotion/cache"
import { createEmotionCache } from "../lib/emotion"
import { AppContextProvider } from "../lib/context"
import { fetchAPI } from "../lib/api"
import { breakpoints } from "../lib/responsive"

export type CustomAppProps = AppProps & {
    emotionCache: EmotionCache,
    layout: any
}

const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props: CustomAppProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        layout,
        pageProps
    } = props

    return (
        <CacheProvider value={emotionCache}>
            <AppContextProvider value={{ layout }}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width"/>
                    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"></script>
                    {process.env.NODE_ENV === "development" && (
                        <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script>
                    )}
                </Head>
                <Global
                    styles={css`
                        body {
                            margin: 0;
                            background-color: #000;
                            color: #fff;
                            font-family: 'Inter', sans-serif;
                            overflow-x: hidden;

                            @media ${breakpoints.s} {
                                font-size: 14px;
                            }
                        }

                        a {
                            color: #fff;
                            text-decoration: none;
                        }
                    `}
                />
                <Component {...pageProps} />
            </AppContextProvider>
        </CacheProvider>
    )
}

MyApp.getInitialProps = async (ctx: AppContext) => {
    const props = await App.getInitialProps(ctx)
    const layout = await fetchAPI("/layout", {
        populate: {
            header: {
                populate: "*"
            },
            footer: {
                populate: "*"
            }
        }
    })
    return {
        ...props,
        layout: layout.data
    }
}
