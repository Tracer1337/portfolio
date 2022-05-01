/** @jsxImportSource @emotion/react */
import { GetStaticProps } from "next"
import { css } from "@emotion/react"
import CrashAnimation from "../components/CrashAnimation"
import Techstack from "../components/Techstack"
import { getProjects, getSkills } from "../lib/cms"

type Props = {
    projects: any[],
    skills: any[]
}

export default function Index({ projects, skills }: Props) {
    skills = [...skills, ...skills, ...skills, ...skills]

    return (
        <CrashAnimation css={css`
            margin-top: 64px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `}>
            <Techstack skills={skills}/>
        </CrashAnimation>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const projects = await getProjects()
    const skills = await getSkills()
    console.log(projects[0], skills[0])
    return {
        props: {
            projects,
            skills
        }
    }
}
