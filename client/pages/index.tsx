/** @jsxImportSource @emotion/react */
import { useRef } from "react"
import { GetStaticProps } from "next"
import { css } from "@emotion/react"
import Container from "../components/styled/Container"
import Background from "../components/styled/Background"
import Header from "../components/Layout/Header"
import Footer from "../components/Layout/Footer"
import CrashAnimation from "../components/CrashAnimation"
import LandingAnimation from "../components/LandingAnimation"
import Techstack from "../components/Techstack"
import Projects from "../components/Projects"
import { fetchAPI } from "../lib/api"
import { Animation } from "../lib/animation"

type Props = {
    projects: any[],
    skills: any[]
}

export default function Index({ projects, skills }: Props) {
    const crashAnimationRef = useRef<Animation>(null)
    const landingAnimationRef = useRef<Animation>(null)
    const projectsSectionRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <Background/>
            <Header/>
            <Container>
                <CrashAnimation
                    ref={crashAnimationRef}
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
                            ref={landingAnimationRef}
                            css={css`display: flex;`}
                        />
                    </div>
                </CrashAnimation>
                <Footer/>
            </Container>
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
