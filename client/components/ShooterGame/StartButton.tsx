/** @jsxImportSource @emotion/react */
import React from "react"
import { css, keyframes } from "@emotion/react"
import Button from "@components/Button"

const fadeIn = keyframes`
    from { right: -100px; }
    to { right: 32px; }
`

function StartButton(props: React.ComponentProps<typeof Button>) {
    return (
        <Button
            css={css`
                position: fixed;
                bottom: 32px;
                animation: ${fadeIn} 300ms forwards;
            `}
            {...props}
        >
            Click Me
        </Button>
    )
}

export default StartButton
