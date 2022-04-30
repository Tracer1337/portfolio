/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Container from "../styled/Container"
import Link from "next/link"

function Header() {
    return (
        <Container css={css`
            height: 128px;
            display: flex;
            align-items: center;
        `}>
            <Link href="/">
                <h3 css={css`
                    margin: 0;
                    cursor: pointer;
                `}>Merlin Moelter</h3>
            </Link>
        </Container>
    )
}

export default Header
