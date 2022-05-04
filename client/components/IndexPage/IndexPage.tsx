/** @jsxImportSource @emotion/react */
import { useMemo, useRef } from "react"
import { css } from "@emotion/react"
import Container from "../Container"
import Background from "../Background"
import Header from "../Layout/Header"
import Footer from "../Layout/Footer"
import CrashAnimation from "../CrashAnimation"
import LandingAnimation from "../LandingAnimation"
import Techstack from "../Techstack"
import Projects from "../Projects"
import { Animation } from "../../lib/animation"
import { useAnimationController } from "./animation"

export type IndexPageProps = {
    projects: any[],
    skills: any[]
}

function IndexPage({ projects, skills }: IndexPageProps) {
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
            <Container ref={containerRef}>
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

export default IndexPage
