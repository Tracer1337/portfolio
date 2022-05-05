import styled from "@emotion/styled"
import { breakpoints } from "../../lib/responsive"

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;

    @media ${breakpoints.m} {
        max-width: 800px;
    }

    @media ${breakpoints.s} {
        padding: 0 16px;
    }
`

export default Container
