import React from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardMedia, CardActions, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import WebsiteIcon from "@material-ui/icons/Language"

import { getImageURL } from "../config/api"
import googlePlayIcon from "../assets/images/google_play.webp"
import placeholderImage from "../assets/images/placeholder-image.png"
import embeddedIcon from "../assets/images/embedded-icon.jpg"

/**
 * Assign icons / elements to every type
 */
const projectTypeElementMap = {
    "android-app": ({ className }) => <img src={googlePlayIcon} className={className} alt="Google Play"/>,
    "website": ({ className }) => <WebsiteIcon className={className}/>,
    "npm-package": ({ className }) => <i className={clsx(className, "devicon-npm-original-wordmark", "colored")}/>,
    "embedded": ({ className }) => <img src={embeddedIcon} className={className} alt="Embedded" style={{ filter: "invert(1)" }}/>
}

const useStyles = makeStyles(theme => ({
    projectCard: {
        width: 330,
        color: theme.palette.common.white,
        background: "#0c2e4e",
        transition: "background-color 150ms ease-out",

        "&:hover": {
            background: "#1f4468"
        }
    },

    headerAction: {
        margin: 0
    },

    headerIcon: {
        width: 24,
        fontSize: 24
    },

    headerIconWrapper: {
        height: 32,
        display: "flex",
        alignItems: "center"
    },

    image: {
        paddingTop: (330 - theme.spacing(1) * 2) * 9 / 16, // 16:9,
        margin: theme.spacing(1),
        borderRadius: theme.shape.borderRadius
    },

    content: {
        paddingBottom: 0,
        height: 60
    },

    link: {
        textDecoration: "none",
        color: theme.palette.common.white,

        "& span": {
            color: theme.palette.common.white
        }
    },

    icon: {
        fontSize: 18,
        color: theme.palette.common.white
    }
}))

function ProjectCard({ data }) {
    const classes = useStyles()

    const projectPageLink = "/project/" + data.slug

    return (
        <Card className={classes.projectCard} data-shootable>
            <Link to={projectPageLink} className={classes.link}>
                <CardHeader
                    title={data.name}
                    action={
                        <div className={classes.headerIconWrapper}>
                            { projectTypeElementMap[data.type] && React.createElement(projectTypeElementMap[data.type], {
                                className: classes.headerIcon
                            }) }
                        </div>
                    }
                    classes={{
                        action: classes.headerAction
                    }}
                />

                <CardMedia
                    image={data.thumbnail ? getImageURL(data.thumbnail) : placeholderImage}
                    className={classes.image}
                />
            </Link>

            <CardActions>
                <Link to={projectPageLink} className={classes.link}>
                    <Button size="small" color="primary">
                        Details
                    </Button>
                </Link>

                <Button size="small" color="primary" href={data.website} target="_blank" className={classes.link}>
                    Open
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProjectCard
