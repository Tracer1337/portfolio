/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react"
import React, { useEffect } from "react"

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`

function Modal(props: React.ComponentProps<"div">) {
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = ""
        }
    }, [])

    return (
        <div
            css={css`
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.7);
                animation: ${fadeIn} 250ms forwards;
            `}
            {...props}
        >
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Modal
