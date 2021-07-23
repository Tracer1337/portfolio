import React from "react"
import { Container, Box } from "@material-ui/core"

import Header from "./Header"

export default function Layout({
    children
}: React.PropsWithChildren<{}>) {
    return (
        <Box pb={8}>
            <Header/>
            <Container maxWidth="lg">
                {children}
            </Container>
        </Box>
    )
}
