/** @jsxImportSource @emotion/react */
import { CacheProvider, css, Global } from "@emotion/react"
import Head from "next/head"
import App, { AppContext, AppProps } from "next/app"
import { EmotionCache } from "@emotion/cache"
import { createEmotionCache } from "@lib/emotion"
import { AppContextProvider } from "@lib/context"
import { fetchAPI } from "@lib/api"
import { breakpoints } from "@lib/responsive"

export type CustomAppProps = AppProps & {
    emotionCache: EmotionCache,
    layout: any,
    defaultSEO: any
}

const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props: CustomAppProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        layout,
        defaultSEO,
        pageProps
    } = props

    return (
        <CacheProvider value={emotionCache}>
            <AppContextProvider initialValue={{
                layout,
                defaultSEO,
                isGameRunning: false
            }}>
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
                            overflow-x: hidden;

                            @media ${breakpoints.s} {
                                font-size: 14px;
                            }
                        }

                        a {
                            color: #fff;
                            text-decoration: none;
                        }

                        [data-destroyed] {
                            opacity: 0 !important;
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
    const defaultSEO = await fetchAPI("/default-seo", {
        populate: {
            seo: {
                populate: {
                    favicon: {
                        populate: "*"
                    },
                    open_graph: {
                        populate: "*"
                    },
                    twitter: {
                        populate: "*"
                    }
                }
            }
        }
    })
    return {
        ...props,
        layout: layout.data,
        defaultSEO: defaultSEO.data
    }
}
