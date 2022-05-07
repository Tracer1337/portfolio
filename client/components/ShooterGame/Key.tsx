/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"
import Icon from "@mdi/react"

function Key({
    className,
    ...props
}: React.ComponentProps<typeof Icon> & {
    className?: string
}) {
    return (
        <div
            css={css`
                width: 24px;
                height: 24px;
                padding: 16px;
                border: 1px solid #fff;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
            `}
            className={className}
        >
            <Icon size="24px" {...props}/>
        </div>
    )
}

export default Key
