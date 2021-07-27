import React from "react"
import { Container as MuiContainer } from "@material-ui/core"

function Container({ children, ...props }) {
    return (
        <MuiContainer {...props}>
            { children }
        </MuiContainer>
    )
}

export default Container