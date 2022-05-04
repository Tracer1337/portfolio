/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useRef } from "react"
import { GetStaticProps } from "next"
import { css } from "@emotion/react"
import Container from "../components/styled/Container"
import Background from "../components/Background"
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

function constrain(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value))
}

function fix(element: HTMLElement, from: number, to: number) {
    element.style.transform = `translateY(${constrain(window.scrollY - from, 0, to - from)}px)`
}

function animate(animation: Animation, from: number, to: number) {
    animation.update((constrain(window.scrollY, from, to) - from) / (to - from))
}

function useAnimationController({
    containerRef,
    headerContainerRef,
    projectsSectionRef,
    landingAnimationContainerRef,
    headerAnimationRef,
    crashAnimationRef,
    landingAnimationRef
}: {
    containerRef: React.RefObject<HTMLDivElement>,
    headerContainerRef: React.RefObject<HTMLDivElement>,
    projectsSectionRef: React.RefObject<HTMLDivElement>,
    landingAnimationContainerRef: React.RefObject<HTMLDivElement>,
    headerAnimationRef: React.RefObject<Animation>,
    crashAnimationRef: React.RefObject<Animation>,
    landingAnimationRef: React.RefObject<Animation>
}) {
    const handleScroll = useCallback(() => {
        const container = containerRef.current
        const headerContainer = headerContainerRef.current
        const projectsSection = projectsSectionRef.current
        const landingAnimationContainer = landingAnimationContainerRef.current
        const headerAnimation = headerAnimationRef.current
        const crashAnimation = crashAnimationRef.current
        const landingAnimation = landingAnimationRef.current

        if (
            !container ||
            !headerContainer ||
            !projectsSection ||
            !landingAnimationContainer ||
            !headerAnimation ||
            !crashAnimation ||
            !landingAnimation
        ) return

        fix(headerContainer, 0, 1200)
        animate(headerAnimation, 1000, 1200)

        fix(container, 0, 1000)
        animate(crashAnimation, 0, 1000)

        const projectsSectionRect = projectsSection.getBoundingClientRect()
        fix(landingAnimationContainer, 1500, 1500 + projectsSectionRect.height - 500)
        animate(landingAnimation, 1500, 1500 + projectsSectionRect.height - 500)
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
    const headerContainerRef = useRef<HTMLDivElement>(null)
    const projectsSectionRef = useRef<HTMLDivElement>(null)
    const landingAnimationContainerRef = useRef<HTMLDivElement>(null)
    const headerAnimationRef = useRef<Animation>(null)
    const crashAnimationRef = useRef<Animation>(null)
    const landingAnimationRef = useRef<Animation>(null)

    useAnimationController({
        containerRef,
        headerContainerRef,
        projectsSectionRef,
        landingAnimationContainerRef,
        headerAnimationRef,
        crashAnimationRef,
        landingAnimationRef
    })

    return (
        <>
            <Background/>
            <Container ref={headerContainerRef}>
                <Header ref={headerAnimationRef}/>
            </Container>
            <Container ref={containerRef} css={css`padding-bottom: 1000px;`}>
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
                <div
                    ref={projectsSectionRef}
                    css={css`
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 300px;
                    `}
                >
                    <Projects projects={projects}/>
                    <div ref={landingAnimationContainerRef}>
                        <LandingAnimation
                            ref={landingAnimationRef}
                            css={css`display: flex;`}
                        />
                    </div>
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
