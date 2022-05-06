/** @jsxImportSource @emotion/react */
import { useRef } from "react"
import { css } from "@emotion/react"
import Container from "../Container"
import Background from "../Background"
import Header from "../Layout/Header"
import Footer from "../Layout/Footer"
import CrashAnimation from "../CrashAnimation"
import LandingAnimation from "../LandingAnimation"
import Techstack from "../Techstack"
import Projects from "../Projects"
import { useAnimationController } from "./animation"
import { Animation } from "../../lib/animation"
import { breakpoints } from "../../lib/responsive"
import { ScrollMagicScript } from "../../lib/scrollmagic"

export type IndexPageProps = {
    projects: any[],
    skills: any[]
}

function IndexPage({ projects, skills }: IndexPageProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const projectsSectionRef = useRef<HTMLDivElement>(null)
    const landingAnimationContainerRef = useRef<HTMLDivElement>(null)
    const backgroundAnimationRef = useRef<Animation>(null)
    const headerAnimationRef = useRef<Animation>(null)
    const crashAnimationRef = useRef<Animation>(null)
    const landingAnimationRef = useRef<Animation>(null)

    useAnimationController({
        containerRef,
        projectsSectionRef,
        landingAnimationContainerRef,
        backgroundAnimationRef,
        headerAnimationRef,
        crashAnimationRef,
        landingAnimationRef
    })

    return (
        <>
            <ScrollMagicScript/>
            <Background ref={backgroundAnimationRef}/>
            <div css={css`                
                position: sticky;
                top: 0;
                @media ${breakpoints.m} {
                    position: static;
                }
            `}>
                <Header ref={headerAnimationRef}/>
            </div>
            <Container>
                <div ref={containerRef}>
                    <div css={css`
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 300px;
                        @media ${breakpoints.m} {
                            margin-bottom: 128px;
                            justify-content: center;
                        }
                        @media ${breakpoints.s} {
                            margin-bottom: 32px;
                        }
                    `}>
                        <CrashAnimation
                            ref={crashAnimationRef}
                            css={css`
                                @media ${breakpoints.m} {
                                    display: none;
                                }
                            `}
                        />
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
                        @media ${breakpoints.m} {
                            margin-bottom: 0;
                            justify-content: center
                        }
                    `}>
                        <div ref={projectsSectionRef}>
                            <Projects projects={projects}/>
                            <Footer css={css`
                                margin-top: 300px;
                                transform: translateX(50%);
                                @media ${breakpoints.m} {
                                    margin: 64px auto;
                                    transform: none;
                                }
                            `}/>
                        </div>
                        <div
                            ref={landingAnimationContainerRef}
                            css={css`
                                width: 500px;
                                @media ${breakpoints.m} {
                                    display: none;
                                }
                            `}
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
