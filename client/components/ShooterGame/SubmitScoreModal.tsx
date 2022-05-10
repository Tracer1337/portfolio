/** @jsxImportSource @emotion/react */
import { useState } from "react"
import { useSWRConfig } from "swr"
import { css } from "@emotion/react"
import Backdrop from "@components/Backdrop"
import Button from "@components/Button"
import TextField from "@components/TextField"
import { Spaceship as SpaceshipType } from "./utils/spaceships"
import { getStrapiUrl } from "@lib/api"

function SubmitScoreModal({ score, spaceship, onDone }: {
    score: number,
    spaceship: SpaceshipType,
    onDone: () => void
}) {
    const { mutate } = useSWRConfig()
    
    const [nickname, setNickname] = useState("")

    const handleSubmit = () => {
        if (!nickname) {
            return
        }
        fetch(getStrapiUrl("/api/highscores"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: {
                    nickname,
                    score,
                    spaceship: spaceship.key
                }
            })
        })
            .then(() => mutate("/api/highscores"))
            .finally(onDone)
    }

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
                <Button
                    css={css`width: 100%;`}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </Backdrop>
    )
}

export default SubmitScoreModal
