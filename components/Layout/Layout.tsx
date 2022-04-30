/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import Background from "../styled/Background"
import Container from "../styled/Container"
import Header from "./Header"

function Layout({ children }: React.PropsWithChildren<{}>) {
    return (
        <>
            <Background/>
            <div css={css`margin-bottom: 16px;`}>
                <Header/>
            </div>
            <Container>
                {children}
            </Container>
        </>
    )
}

export default Layout
