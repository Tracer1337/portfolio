/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react"
import Icon from "@mdi/react"
import { mdiArrowUpThin } from '@mdi/js'
import Backdrop from "@components/Backdrop"
import { useSelection } from "./utils/selection"
import { spaceships } from "./utils/spaceships"

const bounce = keyframes`
    0% { transform: translateY(0) }
    50% { transform: translateY(20px) }
    100% { transform: translateY(0) }
`

function SpaceshipSelector({ onSelect }: {
    onSelect: (selection: number) => void
}) {
    const selectionIndicatorRef = useSelection({
        length: spaceships.length,
        onSelect
    })

    return (
        <Backdrop css={css`
            display: flex;
            flex-direction: column;
        `}>
            <div css={css`display: flex;`}>
                {spaceships.map((spaceship, i) => (
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
                            src={spaceship.sprite.url}
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
                    height: 64px;
                    margin-top: 8px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    transition: all 250ms;
                `}
            >
                <Icon
                    path={mdiArrowUpThin}
                    size="32px"
                    css={css`animation: ${bounce} 1s infinite;`}
                />
            </div>
            <div css={css`
                text-align: center;
                margin-bottom: -88px;
                opacity: .87;
            `}>
                <p>Press <strong>ARROW KEYS</strong> to select a spaceship</p>
                <p>Press <strong>ENTER</strong> to confirm</p>
            </div>
        </Backdrop>
    )
}

export default SpaceshipSelector
