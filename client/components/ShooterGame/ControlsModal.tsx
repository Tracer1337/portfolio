/** @jsxImportSource @emotion/react */
import { useEffect } from "react"
import { css } from "@emotion/react"
import {
    mdiArrowUp,
    mdiArrowLeft,
    mdiArrowRight,
    mdiKeyboardSpace
} from "@mdi/js"
import Backdrop from "@components/Backdrop"
import Key from "./Key"
import { setListeners } from "@lib/events"

function ControlsModal({ onClose }: {
    onClose: () => void
}) {
    useEffect(() => setListeners(window, [
        ["keydown", (event: KeyboardEvent) => {
            if (event.key === "Enter") onClose()
        }]
    ]), [onClose])

    return (
        <Backdrop>
            <div css={css`
                width: 450px;
                display: flex;
                margin-bottom: -16px;
                & > div {
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    margin: 16px;
                }
                & h3 {
                    text-align: center;
                }
            `}>
                <div>
                    <div css={css`
                        display: flex;
                        justify-content: center;
                        margin-bottom: 16px;
                    `}>
                        <Key path={mdiArrowUp}/>
                    </div>
                    <div css={css`
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 8px;
                    `}>
                        <Key path={mdiArrowLeft}/>
                        <Key path={mdiArrowRight}/>
                    </div>
                    <h3>Movement</h3>
                </div>
                <div>
                    <div css={css`margin-bottom: 8px;`}>
                        <Key
                            path={mdiKeyboardSpace}
                            css={css`width: calc(100% - 32px);`}
                        />
                    </div>
                    <h3>Shoot</h3>
                </div>
            </div>
            <div css={css`
                width: 450px;
                margin-bottom: -52px;
                opacity: .87;
            `}>
                <div css={css`text-align: center;`}>
                    <p>Press <strong>ENTER</strong> to start</p>
                </div>
            </div>
        </Backdrop>
    )
}

export default ControlsModal
