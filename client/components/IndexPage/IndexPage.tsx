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
    const techstackSectionRef = useRef<HTMLDivElement>(null)
    const projectsSectionRef = useRef<HTMLDivElement>(null)
    const landingAnimationContainerRef = useRef<HTMLDivElement>(null)
    const backgroundAnimationRef = useRef<Animation>(null)
    const headerAnimationRef = useRef<Animation>(null)
    const crashAnimationRef = useRef<Animation>(null)
    const landingAnimationRef = useRef<Animation>(null)

    useAnimationController({
        containerRef,
        headerContainerRef,
        techstackSectionRef,
        projectsSectionRef,
        landingAnimationContainerRef,
        backgroundAnimationRef,
        headerAnimationRef,
        crashAnimationRef,
        landingAnimationRef
    })

    return (
        <>
            <Background ref={backgroundAnimationRef}/>
            <Container ref={headerContainerRef} css={css`
                position: sticky;
                top: 0;
            `}>
                <Header ref={headerAnimationRef}/>
            </Container>
            <Container>
                <div ref={containerRef}>
                    <div
                        ref={techstackSectionRef}
                        css={css`
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 300px;
                        `}
                    >
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
                        <div ref={projectsSectionRef}>
                            <Projects projects={projects}/>
                            <Footer css={css`
                                margin-top: 300px;
                                transform: translateX(50%);
                            `}/>
                        </div>
                        <div
                            ref={landingAnimationContainerRef}
                            css={css`width: 500px;`}
                        >
                            <LandingAnimation
                                ref={landingAnimationRef}
                                css={css`display: flex;`}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default IndexPage
