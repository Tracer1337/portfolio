/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import Container from "../styled/Container"

function Layout({ children }: React.PropsWithChildren<{}>) {
    return (
        <Container css={css`
            margin-top: 64px;
        `}>
            {children}
        </Container>
    )
}

export default Layout
