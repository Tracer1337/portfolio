/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import Background from "@components/Background"
import Container from "@components/Container"
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
