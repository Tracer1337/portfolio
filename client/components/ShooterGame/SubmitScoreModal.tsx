/** @jsxImportSource @emotion/react */
import { useState } from "react"
import { css } from "@emotion/react"
import Backdrop from "@components/Backdrop"
import Button from "@components/Button"
import TextField from "@components/TextField"

function SubmitScoreModal({ score }: {
    score: number
}) {
    const [nickname, setNickname] = useState("")

    return (
        <Backdrop>
            <div css={css`
                max-width: 500px;
                padding: 32px;
                border: 1px solid #fff;
            `}>
                <h1 css={css`
                    text-align: center;
                    margin: 0;
                    margin-bottom: 32px;
                `}>
                    Score: <u>{score}</u>
                </h1>
                <TextField
                    type="text"
                    placeholder="Enter Nickname..."
                    value={nickname}
                    onChange={(event) => {
                        setNickname(event.currentTarget.value)
                    }}
                    css={css`
                        width: 100%;
                        margin-bottom: 32px;
                    `}
                />
                <Button css={css`width: 100%;`}>Submit</Button>
            </div>
        </Backdrop>
    )
}

export default SubmitScoreModal
