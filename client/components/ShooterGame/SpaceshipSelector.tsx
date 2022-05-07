/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react"
import Modal from "../Modal/Modal"
import { useSelection } from "./selection"

const sprites = [
    { url: "/x-wing.png" },
    { url: "/millennium-falcon.png" },
    { url: "/enterprise.png" }
]

const bounce = keyframes`
    0% { transform: rotate(-45deg) translate(0, 0) }
    50% { transform: rotate(-45deg) translate(-20px, 20px) }
    100% { transform: rotate(-45deg) translate(0, 0) }
`

function SpaceshipSelector({ onSelect }: {
    onSelect: (sprite: { url: string }) => void
}) {
    const selectionIndicatorRef = useSelection({
        length: sprites.length,
        onSelect: (selection) => onSelect(sprites[selection])
    })

    return (
        <Modal css={css`
            display: flex;
            flex-direction: column;
        `}>
            <div css={css`
                margin-bottom: 64px;
                margin-top: -64px;
                & p {
                    opacity: .87;
                }
            `}>
                <p>Use <strong>ARROW KEYS</strong> to select a spaceship</p>
                <p>Confirm with <strong>ENTER</strong></p>
            </div>
            <div css={css`
                display: flex;
            `}>
                {sprites.map((sprite, i) => (
                    <div key={i} css={css`
                        width: 250px;
                        height: 250px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 16px;
                        margin: 8px;
                    `}>
                        <img
                            src={sprite.url}
                            alt="Sprite"
                            css={css`
                                max-width: 100%;
                                max-height: 100%;
                            `}
                        />
                    </div>
                ))}
            </div>
            <div
                ref={selectionIndicatorRef}
                css={css`
                    width: 300px;
                    margin-top: 8px;
                    display: flex;
                    justify-content: center;
                    transition: all 250ms;
                `}
            >
                <img
                    src="/arrow.svg"
                    alt="Selection"
                    css={css`
                        width: 32px;
                        height: 32px;
                        animation: ${bounce} 1s infinite;
                    `}
                />
            </div>
        </Modal>
    )
}

export default SpaceshipSelector
