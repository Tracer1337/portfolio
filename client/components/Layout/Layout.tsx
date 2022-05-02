/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import Background from "../styled/Background"
import Container from "../styled/Container"
import Header from "./Header"
import Footer from "./Footer"

function Layout({ children }: React.PropsWithChildren<{}>) {
    return (
        <>
            <Background/>
            <Header css={css`margin-bottom: 16px;`}/>
            <Container>
                {children}
            </Container>
            <Footer css={css`margin-top: 100px;`}/>
        </>
    )
}

export default Layout
