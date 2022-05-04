/** @jsxImportSource @emotion/react */
import React, { useEffect, useImperativeHandle, useRef, useState } from "react"
import { css } from "@emotion/react"
import anime from "animejs"
import Container from "../Container"
import Link from "next/link"
import { useAppContext } from "../../lib/context"
import { Animation } from "../../lib/animation"

function useAnimation({
    leftElementRef,
    rightElementRef
}: {
    leftElementRef: React.RefObject<HTMLDivElement>,
    rightElementRef: React.RefObject<HTMLDivElement>
}) {
    const [animation, setAnimation] = useState<anime.AnimeInstance>()

    useEffect(() => {
        const leftElement = leftElementRef.current
        const rightElement = rightElementRef.current
        
        if (!leftElement || !rightElement) return

        const anim = anime.timeline({
            easing: "linear",
            duration: 1,
            autoplay: false
        })
        .add({
            targets: leftElement,
            opacity: 0,
            translateX: -200
        })
        .add({
            targets: rightElement,
            opacity: 0,
            translateX: 200
        }, "-=1")
        
        setAnimation(anim)
    }, [])

    return animation
}

function Header(
    props: React.ComponentProps<"div">,
    ref: React.ForwardedRef<Animation>
) {
    const context = useAppContext()

    const leftElementRef = useRef<HTMLDivElement>(null)
    const rightElementRef = useRef<HTMLDivElement>(null)

    const animation = useAnimation({
        leftElementRef,
        rightElementRef
    })

    useImperativeHandle(ref, () => ({
        update: (progress) => animation?.seek(progress)
    }))

    const { header } = context.layout.attributes

    if (!header) {
        return <></>
    }

    return (
        <Container
            css={css`
                height: 128px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            `}
            {...props}
        >
            {!header.title ? <div/> : (
                <Link href="/">
                    <h3
                        ref={leftElementRef}
                        css={css`
                            margin: 0;
                            cursor: pointer;
                        `}
                    >
                        {header.title}
                    </h3>
                </Link>
            )}
            {header.action && (
                <a href={header.action.url} target="_blank">
                    <h4
                        ref={rightElementRef}
                        css={css`
                            margin: 0;
                            cursor: pointer;
                        `}
                    >
                        {header.action.label}
                    </h4>
                </a>
            )}
        </Container>
    )
}

export default React.forwardRef(Header)
