/** @jsxImportSource @emotion/react */
import React, { useImperativeHandle, useRef } from "react"
import { css } from "@emotion/react"
import Link from "next/link"
import Container from "../Container"
import { useAppContext } from "../../lib/context"
import { Animation } from "../../lib/animation"
import { useHeaderAnimation } from "./animation"
import { breakpoints } from "../../lib/responsive"

function Header(
    props: React.ComponentProps<"div">,
    ref: React.ForwardedRef<Animation>
) {
    const context = useAppContext()

    const leftElementRef = useRef<HTMLDivElement>(null)
    const rightElementRef = useRef<HTMLDivElement>(null)

    const animation = useHeaderAnimation({
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
                @media ${breakpoints.s} {
                    height: 80px;
                }
            `}
            {...props}
        >
            {!header.title ? <div/> : (
                <Link href="/">
                    <h3
                        ref={leftElementRef}
                        data-shootable
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
                        data-shootable
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
