import styled from "@emotion/styled"

const Button = styled.button<{
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

export default Button
