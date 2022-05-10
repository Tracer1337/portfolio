/** @jsxImportSource @emotion/react */
import React from "react"
import styled from "@emotion/styled"
import LoadingIndicator from "@components/LoadingIndicator"

const ButtonBase = styled.button<{
    discrete?: boolean
}>`
    background-color: transparent;
    color: #fff;
    border: ${props => !props.discrete ? "1px solid #fff" : "none"};
    padding: .8em 1em;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 150ms;

    ${props => !props.discrete && `
        &:hover {
            background-color: #fff;
            color: #000;
        }
    `}
`

function Button(
    {
        isLoading,
        children,
        ...props
    }: React.ComponentProps<typeof ButtonBase> & {
        isLoading?: boolean
    }
) {
    return (
        <ButtonBase {...props}>
            {isLoading ? <LoadingIndicator/> : children}
        </ButtonBase>
    )
}

export default Button
