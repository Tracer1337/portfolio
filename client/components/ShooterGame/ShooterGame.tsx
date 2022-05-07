/** @jsxImportSource @emotion/react */
import { useState } from "react"
import SpaceshipSelector from "./SpaceshipSelector"
import StartButton from "./StartButton"

function ShooterGame() {
    const [isSelectionOpen, setIsSelectionOpen] = useState(false)
    const [spaceship, setSpaceship] = useState<string>()

    return (
        <>
            <StartButton onClick={(event) => {
                setIsSelectionOpen(true)
                event.currentTarget.blur()
            }}/>
            {isSelectionOpen && (
                <SpaceshipSelector onSelect={(sprite) => {
                    setSpaceship(sprite.url)
                    setIsSelectionOpen(false)
                }}/>
            )}
        </>
    )
}

export default ShooterGame
