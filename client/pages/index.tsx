/** @jsxImportSource @emotion/react */
import { GetStaticProps } from "next"
import { fetchAPI } from "@lib/api"
import IndexPage, { IndexPageProps } from "@components/IndexPage/IndexPage"
import SEO from "@components/SEO"

export default function Index({ seo, ...props }: IndexPageProps & {
    seo: any
}) {
    return (
        <>
            <SEO seo={seo}/>
            <IndexPage {...props}/>
        </>
    )
}

export const getStaticProps: GetStaticProps<
    IndexPageProps & { seo: any }
> = async () => {
    const seo = await fetchAPI("/index-page", {
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
    const projects = await fetchAPI("/projects", {
        populate: {
            thumbnail: "*"
        },
        sort: "position",
        pagination: {
            pageSize: 100
        }
    })
    const skills = await fetchAPI("/skills", {
        populate: {
            icon: "*"
        },
        pagination: {
            pageSize: 100
        }
    })
    return {
        props: {
            seo: seo.data,
            projects: projects.data,
            skills: skills.data
        }
    }
}
