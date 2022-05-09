/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React, { useImperativeHandle, useState } from "react"

export type ScoreboardRef = {
    setScore: (score: number) => void
}

function Scoreboard(
    props: React.ComponentProps<"div">,
    ref: React.ForwardedRef<ScoreboardRef>
) {
    const [score, setScore] = useState(0)

    useImperativeHandle(ref, () => ({ setScore }))

    return (
        <div
            css={css`
                min-width: 64px;
                text-align: center;
                position: fixed;
                top: 32px;
                right: 32px;
                padding: 16px;
                border: 1px solid #fff;
                background-color: rgba(0, 0, 0, .87);
            `}
            {...props}
        >
            {score}
        </div>
    )
}

export default React.forwardRef(Scoreboard)
