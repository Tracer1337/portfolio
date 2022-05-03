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
    const crashAnimationRef = useRef<HTMLDivElement>(null)
    const projectsSectionRef = useRef<HTMLDivElement>(null)

    const [crashAnimationRect, setCrashAnimationRect] = useState<DOMRect>()
    const [projectsSectionHeight, setProjectsSectionHeight] = useState(0)

    useEffect(() => {
        setCrashAnimationRect(
            crashAnimationRef.current?.getBoundingClientRect()
        )
        setProjectsSectionHeight(
            projectsSectionRef.current?.clientHeight || 0
        )
    }, [])

    return (
        <>
            <CrashAnimation
                ref={crashAnimationRef}
                offset={crashAnimationRect ? -crashAnimationRect.y : 0}
                duration={1500}
                css={css`
                    margin-top: 64px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                `}
            >
                <Techstack
                    skills={skills}
                    css={css`flex-grow: 1;`}
                />
                <div ref={projectsSectionRef} css={css`
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-top: 300px;
                    margin-bottom: 300px;
                `}>
                    <Projects projects={projects}/>
                    <LandingAnimation
                        offset={300}
                        duration={projectsSectionHeight - 500}
                        css={css`display: flex;`}
                    />
                </div>
            </CrashAnimation>
        </>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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
