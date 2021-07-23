import React from "react"
import { Avatar, Container, makeStyles } from "@material-ui/core"
import { Link } from "gatsby-theme-material-ui"

import ProfilePicture from "../assets/images/profile_picture.webp"

const useStyles = makeStyles((theme) => ({
    header: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    }
}))

export default function Header() {
    const classes = useStyles()

    return (
        <Container className={classes.header} maxWidth="lg">
            <Link to="/">
                <Avatar src={ProfilePicture}/>
            </Link>
        </Container>
    )
}
