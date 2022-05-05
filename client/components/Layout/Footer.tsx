/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import Container from "../Container"
import { useAppContext } from "../../lib/context"

function Footer(props: React.ComponentProps<"div">) {
    const context = useAppContext()

    const { footer } = context.layout.attributes
    
    if (!footer) {
        return <></>
    }

    return (
        <Container
            css={css`
                height: 100px;
                display: flex;
                align-items: flex-start;
                justify-content: center;
            `}
            {...props}
        >
            {!footer.copyright ? (
                <div css={css`
                    background-color: #fff;
                    height: 1px;
                    width: 150px;
                `}/>
            ) : (
                <span css={css`
                    font-size: .8em;
                    opacity: 0.75;
                `}>
                    Copyright &copy;&nbsp;
                    {footer.copyright.year}&nbsp;
                    {footer.copyright.name}.
                    All Rights Reserved
                </span>
            )}
        </Container>
    )
}

export default Footer
