import React, { useEffect, useState } from "react"
import { ScoreboardRef } from "../Scoreboard"

export type ScoreManager = {
    addScore: (score: number) => void
}

export function useScoreManager({ scoreboardRef }: {
    scoreboardRef: React.RefObject<ScoreboardRef>
}) {
    const [scoreManager, setScoreManager] = useState<ScoreManager>()

    useEffect(() => {
        let score = 0

        const addScore: ScoreManager["addScore"] = (value) => {
            score += value
            scoreboardRef.current?.setScore(score)
        }

        setScoreManager({ addScore })
    }, [])

    return scoreManager
}
