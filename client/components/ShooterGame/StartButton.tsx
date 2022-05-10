/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import Button from "@components/Button"

function StartButton(props: React.ComponentProps<typeof Button>) {
    return (
        <Button
            data-shootable
            css={css`
                position: fixed;
                bottom: 32px;
                right: 32px;
            `}
            {...props}
        >
            Click Me
        </Button>
    )
}

export default StartButton
