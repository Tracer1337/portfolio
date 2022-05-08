/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import {
    mdiArrowUp,
    mdiArrowLeft,
    mdiArrowRight,
    mdiKeyboardSpace
} from "@mdi/js"
import Backdrop from "@components/Backdrop"
import Button from "@components/Button"
import Key from "./Key"

function ControlsModal({ onClose }: {
    onClose: () => void
}) {
    return (
        <Backdrop>
            <div css={css`
                width: 450px;
                display: flex;
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
            <div css={css`width: 450px;`}>
                <Button
                    css={css`width: 100%`}
                    onClick={onClose}
                >
                    Start
                </Button>
            </div>
        </Backdrop>
    )
}

export default ControlsModal
