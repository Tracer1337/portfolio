/** @jsxImportSource @emotion/react */
import React from "react"
import Backdrop from "../Backdrop"

function Controls(props: React.ComponentProps<typeof Backdrop>) {
    return (
        <Backdrop {...props}>
            <div>Controls</div>
        </Backdrop>
    )
}

export default Controls
