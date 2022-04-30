/** @jsxImportSource @emotion/react */
import Link from "next/link"
import Button from "../components/styled/Button"

export default function Index() {
    return (
        <Link href="/about">
            <Button>Click Me</Button>
        </Link>
    )
}
