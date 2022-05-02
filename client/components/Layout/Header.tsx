/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Container from "../styled/Container"
import Link from "next/link"
import { useAppContext } from "../../lib/context"

function Header() {
    const context = useAppContext()

    const { header } = context.layout.attributes

    if (!header) {
        return <></>
    }

    return (
        <Container css={css`
            height: 128px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        `}>
            {!header.title ? <div/> : (
                <Link href="/">
                    <h3 css={css`
                        margin: 0;
                        cursor: pointer;
                    `}>{header.title}</h3>
                </Link>
            )}
            {header.action && (
                <a href={header.action.url} target="_blank">
                    <h4 css={css`
                        margin: 0;
                        cursor: pointer;
                    `}>
                        {header.action.label}
                    </h4>
                </a>
            )}
        </Container>
    )
}

export default Header
