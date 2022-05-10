/** @jsxImportSource @emotion/react */
import { FormEvent, useState } from "react"
import { useSWRConfig } from "swr"
import { css } from "@emotion/react"
import Backdrop from "@components/Backdrop"
import Button from "@components/Button"
import TextField from "@components/TextField"
import { Spaceship as SpaceshipType } from "./utils/spaceships"
import { getStrapiUrl } from "@lib/api"

function SubmitScoreModal({ score, spaceship, onClose }: {
    score: number,
    spaceship: SpaceshipType,
    onClose: () => void
}) {
    const { mutate } = useSWRConfig()
    
    const [nickname, setNickname] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validate = () => {
        if (!nickname) {
            setErrors({ nickname: "Required" })
            return false
        }

        if (nickname.length > 20) {
            setErrors({ nickname: "Max 20 characters" })
            return false
        }

        setErrors({})
        return true
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (!validate()) {
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
            .finally(onClose)
    }

    return (
        <Backdrop>
            <div css={css`
                max-width: 500px;
                padding: 32px;
            `}>
                <h1 css={css`
                    text-align: center;
                    margin: 0;
                    margin-bottom: 32px;
                `}>
                    Score: <u>{score}</u>
                </h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="text"
                        placeholder="Enter Nickname..."
                        error={errors.nickname}
                        value={nickname}
                        onChange={(event) => {
                            setNickname(event.currentTarget.value)
                        }}
                        css={css`
                            width: 300px;
                            margin-bottom: 32px;
                        `}
                    />
                    <Button css={css`width: 100%;`} type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </Backdrop>
    )
}

export default SubmitScoreModal
