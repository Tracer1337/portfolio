import Link from "next/link"
import React from "react"
import Layout from "../components/Layout"
import Button from "../components/styled/Button"

export default function Index() {
    return (
        <Layout>
            <Link href="/about">
                <Button>Click Me</Button>
            </Link>
        </Layout>
    )
}
