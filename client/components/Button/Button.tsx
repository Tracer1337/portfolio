import styled from "@emotion/styled"

const Button = styled.button`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
    padding: .8em 1em;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 150ms;

    &:hover {
        background-color: #fff;
        color: #000;
    }
`

export default Button
