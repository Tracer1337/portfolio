/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useRef } from "react"
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

function useScrollAnimation({
    containerRef,
    headerAnimationRef,
    crashAnimationRef,
    landingAnimationRef
}: {
    containerRef: React.RefObject<HTMLDivElement>,
    headerAnimationRef: React.RefObject<Animation>,
    crashAnimationRef: React.RefObject<Animation>,
    landingAnimationRef: React.RefObject<Animation>
}) {
    const handleScroll = useCallback(() => {
        const container = containerRef.current
        const headerAnimation = headerAnimationRef.current
        const crashAnimation = crashAnimationRef.current
        const landingAnimation = landingAnimationRef.current

        if (
            !container ||
            !headerAnimation ||
            !crashAnimation ||
            !landingAnimation
        ) return

        container.style.paddingTop = `${Math.min(window.scrollY, 1000)}px`
        container.style.paddingBottom = `${Math.max(1000 - window.scrollY, 0)}px`

        headerAnimation.update(window.scrollY / 200)
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [handleScroll])
}

export default function Index({ projects, skills }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const headerAnimationRef = useRef<Animation>(null)
    const crashAnimationRef = useRef<Animation>(null)
    const landingAnimationRef = useRef<Animation>(null)

    useScrollAnimation({
        containerRef,
        headerAnimationRef,
        crashAnimationRef,
        landingAnimationRef
    })

    return (
        <>
            <Background/>
            <Container ref={containerRef} css={css`
                padding-bottom: 1000px;
                position: relative;
            `}>
                <Header ref={headerAnimationRef}/>
                <div css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 300px;
                `}>
                    <CrashAnimation ref={crashAnimationRef}/>
                    <Techstack
                        skills={skills}
                        css={css`flex-grow: 1;`}
                    />
                </div>
                <div css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 300px;
                `}>
                    <Projects projects={projects}/>
                    <LandingAnimation
                        ref={landingAnimationRef}
                        css={css`display: flex;`}
                    />
                </div>
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
