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

function constrain(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value))
}

function fix(element: HTMLElement, from: number, to: number) {
    element.style.transform = `translateY(${constrain(window.scrollY - from, from, to - from)}px)`
}

function animate(animation: Animation, from: number, to: number) {
    animation.update((constrain(window.scrollY, from, to) - from) / (to - from))
}

function useAnimationController({
    containerRef,
    headerContainerRef,
    headerAnimationRef,
    crashAnimationRef,
    landingAnimationRef
}: {
    containerRef: React.RefObject<HTMLDivElement>,
    headerContainerRef: React.RefObject<HTMLDivElement>,
    headerAnimationRef: React.RefObject<Animation>,
    crashAnimationRef: React.RefObject<Animation>,
    landingAnimationRef: React.RefObject<Animation>
}) {
    const handleScroll = useCallback(() => {
        const container = containerRef.current
        const headerContainer = headerContainerRef.current
        const headerAnimation = headerAnimationRef.current
        const crashAnimation = crashAnimationRef.current
        const landingAnimation = landingAnimationRef.current

        if (
            !container ||
            !headerContainer ||
            !headerAnimation ||
            !crashAnimation ||
            !landingAnimation
        ) return

        fix(headerContainer, 0, 1200)
        animate(headerAnimation, 1000, 1200)

        fix(container, 0, 1000)
        animate(crashAnimation, 0, 1000)
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
    const headerAnimationRef = useRef<Animation>(null)
    const crashAnimationRef = useRef<Animation>(null)
    const landingAnimationRef = useRef<Animation>(null)

    useAnimationController({
        containerRef,
        headerContainerRef,
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
