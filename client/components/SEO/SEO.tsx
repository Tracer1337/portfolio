/** @jsxImportSource @emotion/react */
import Head from "next/head"
import OpenGraph from "./OpenGraph"
import Twitter from "./Twitter"
import { useAppContext } from "../../lib/context"

function SEO({ seo }: { seo?: any }) {
    const context = useAppContext()

    const defaults = context.defaultSEO?.attributes.seo
    const overrides = seo?.attributes.seo

    const title = overrides?.title || defaults?.title
    const description = overrides?.description || defaults?.description
    const author = overrides?.author || defaults?.author
    const canonical = overrides?.canonical || defaults?.canonical

    return (
        <>
            <Head>
                {title && <title>{title}</title>}
                {description && <meta name="description" content={description}/>}
                {author && <meta name="author" content={author}/>}
                {canonical && <link rel="canonical" href={canonical}/>}
            </Head>
            <OpenGraph data={overrides?.open_graph}/>
            <Twitter data={overrides?.twitter}/>
        </>
    )
}

export default SEO
