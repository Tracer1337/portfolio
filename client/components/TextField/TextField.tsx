/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"

function TextField(props: React.ComponentProps<"input">) {
    return (
        <input
            css={css`
                height: 38px;
                background-color: transparent;
                outline: none;
                border: 1px solid #fff;
                color: #fff;
                font-family: 'Inter', sans-serif;
            `}
            {...props}
        />
    )
}

export default TextField
