/** @jsxImportSource @emotion/react */
import { GetStaticProps } from "next"
import { css } from "@emotion/react"
import CrashAnimation from "../components/CrashAnimation"
import LandingAnimation from "../components/LandingAnimation"
import Techstack from "../components/Techstack"
import Projects from "../components/Projects"
import { fetchAPI } from "../lib/api"
import { useEffect, useRef, useState } from "react"

type Props = {
    projects: any[],
    skills: any[]
}

export default function Index({ projects, skills }: Props) {
    const projectsSectionRef = useRef<HTMLDivElement>(null)

    const [projectsSectionHeight, setProjectsSectionHeight] = useState(0)

    useEffect(() => {
        setProjectsSectionHeight(
            projectsSectionRef.current?.clientHeight || 0
        )
    }, [])

    return (
        <>
            <CrashAnimation
                offset={-144}
                duration={1000}
                css={css`
                    margin-top: 64px;
                    margin-bottom: 300px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                `}
            >
                <Techstack skills={skills}/>
            </CrashAnimation>
            <div ref={projectsSectionRef} css={css`
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 300px;
            `}>
                <Projects projects={projects}/>
                {projectsSectionHeight > 0 && (
                    <LandingAnimation
                        offset={200}
                        duration={projectsSectionHeight - 500}
                        css={css`display: flex;`}
                    />
                )}
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const projects = await fetchAPI("/projects", {
        populate: {
            thumbnail: "*"
        },
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
