import React, { useEffect, useState } from "react"
import { ScoreboardRef } from "../Scoreboard"

export type ScoreManager = {
    addScore: (score: number) => void,
    getScore: () => number
}

export function useScoreManager({ scoreboardRef }: {
    scoreboardRef: React.RefObject<ScoreboardRef>
}) {
    const [scoreManager, setScoreManager] = useState<ScoreManager>()

    useEffect(() => {
        let score = 0

        scoreboardRef.current?.reset(score)

        const addScore: ScoreManager["addScore"] = (value) => {
            score += value
            scoreboardRef.current?.setScore(score)
        }

        const getScore: ScoreManager["getScore"] = () => score

        setScoreManager({ addScore, getScore })
    }, [])

    return scoreManager
}
