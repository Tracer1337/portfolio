/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Link from "next/link"
import Button from "../components/styled/Button"

export default function Index() {
    return (
        <>
            <Link href="/about">
                <Button css={css`margin-bottom: 1000px`}>
                    Click Me
                </Button>
            </Link>
        </>
    )
}
