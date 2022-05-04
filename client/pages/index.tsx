/** @jsxImportSource @emotion/react */
import { GetStaticProps } from "next"
import { fetchAPI } from "../lib/api"
import IndexPage, { IndexPageProps } from "../components/IndexPage/IndexPage"

export default function Index(props: IndexPageProps) {
    return <IndexPage {...props}/>
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
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
            projects: projects.data,
            skills: skills.data
        }
    }
}
