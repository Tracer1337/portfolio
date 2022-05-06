/** @jsxImportSource @emotion/react */
import Head from "next/head"
import { useAppContext } from "../../lib/context"
import { getStrapiUrl } from "../../lib/api"

function Twitter({ data }: { data?: any }) {
    const context = useAppContext()

    const defaults = context.defaultSEO?.attributes.seo?.twitter

    const card = data?.card || defaults?.card
    const title = data?.title || defaults?.title
    const description = data?.description || defaults?.description
    const image = data?.image?.data || defaults?.image?.data
    const site = data?.site || defaults?.site
    const creator = data?.creator || defaults?.creator
    
    return (
        <Head>
            {card && <meta name="twitter:card" content={card}/>}
            {title && <meta name="twitter:title" content={title}/>}
            {description && <meta name="twitter:description" content={description}/>}
            {image && <meta name="twitter:image" content={getStrapiUrl(image.attributes.url)}/>}
            {site && <meta name="twitter:site" content={site}/>}
            {creator && <meta name="twitter:creator" content={creator}/>}
        </Head>
    )
}

export default Twitter
