/** @jsxImportSource @emotion/react */
import Head from "next/head"
import { useAppContext } from "@lib/context"
import { getStrapiUrl } from "@lib/api"

function OpenGraph({ data }: { data?: any }) {
    const context = useAppContext()

    const defaults = context.defaultSEO?.attributes.seo?.open_graph

    const title = data?.title || defaults?.title
    const description = data?.description || defaults?.description
    const siteName = data?.siteName || defaults?.siteName
    const type = data?.type || defaults?.type
    const image = data?.image?.data || defaults?.image?.data
    
    return (
        <Head>
            {title && <meta name="og:title" content={title}/>}
            {description && <meta name="og:description" content={description}/>}
            {siteName && <meta name="og:site_name" content={siteName}/>}
            {type && <meta name="og:type" content={type}/>}
            {image && <meta name="og:image" content={getStrapiUrl(image.attributes.url)}/>}
        </Head>
    )
}

export default OpenGraph
