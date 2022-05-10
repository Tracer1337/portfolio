/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"

function TextField(
    {
        error,
        className,
        ...props
    }: React.ComponentProps<"input"> & {
        error?: string
    }
) {
    return (
        <div className={className}>
            <input
                css={css`
                    width: 100%;
                    height: 38px;
                    display: block;
                    background-color: transparent;
                    outline: none;
                    border: 1px solid #fff;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                `}
                {...props}
            />
            {error && (
                <div css={css`margin-top: 4px; font-size: .9em;`}>
                    {error}
                </div>
            )}
        </div>
    )
}

export default TextField
