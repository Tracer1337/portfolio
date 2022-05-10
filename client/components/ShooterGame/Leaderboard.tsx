/** @jsxImportSource @emotion/react */
import useSWR from "swr"
import { css } from "@emotion/react"
import Backdrop from "@components/Backdrop"
import { getSpaceshipByKey } from "./utils/spaceships"
import { fetchAPI } from "@lib/api"
import Button from "@components/Button"
import React, { useMemo } from "react"

function Item({ highscore, index }: {
    highscore: any,
    index: number
}) {
    const spaceship = getSpaceshipByKey(highscore.attributes.spaceship)

    return (
        <div css={css`
            min-width: 300px;
            margin: 8px 0;
            display: flex;
            justify-content: space-between;
        `}>
            <h3 css={css`margin-right: 16px;`}>
                <span css={css`margin-right: 8px;`}>
                    {index+1}.
                </span>
                <span>{highscore.attributes.nickname}</span>
            </h3>
            <div css={css`display: flex; align-items: center;`}>
                <h3 css={css`margin-right: 24px;`}>
                    {highscore.attributes.score}
                </h3>
                <div css={css`
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                `}>
                    {spaceship && (
                        <img
                            src={spaceship.sprite.url}
                            alt={spaceship.key}
                            css={css`
                                max-width: 100%;
                                max-height: 100%;
                            `}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

function Leaderboard({ onClose }: { onClose: () => void }) {
    const { data, error } = useSWR<{ data: any[] }>(
        ["/highscores", {
            sort: "score:desc",
            pagination: {
                pageSize: 5
            }
        }],
        fetchAPI
    )

    const Parent = useMemo(() =>
        ({ children }: React.PropsWithChildren<{}>) => (
            <Backdrop>
                <div css={css`max-width: 500px; padding: 32px;`}>
                    {children}
                </div>
            </Backdrop>
        ),
        []
    )

    if (error) return <Parent>Could not load highscores</Parent>
    if (!data) return <Parent>Loading...</Parent>
    
    return (
        <Parent>
            <h1 css={css`
                text-align: center;
                margin: 0;
                margin-bottom: 32px;
            `}>
                Leaderboard
            </h1>
            {data.data.map((highscore, i) => (
                <Item key={i} highscore={highscore} index={i}/>
            ))}
            <Button
                onClick={onClose}
                discrete
                css={css`width: 100%; margin-top: 8px;`}
            >
                Close
            </Button>
        </Parent>
    )
}

export default Leaderboard
