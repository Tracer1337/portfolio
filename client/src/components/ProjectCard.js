import React from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardMedia, CardContent, CardActions, Button, Grid, Tooltip } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import WebsiteIcon from "@material-ui/icons/Language"
import ClockIcon from "@material-ui/icons/Schedule"
import EyeIcon from "@material-ui/icons/Visibility"
import DownloadIcon from "@material-ui/icons/GetApp"

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
    "embedded": ({ className }) => <img src={embeddedIcon} className={className} alt="Embedded"/>
}

const apiLabelMap = {
    "activity_analyzer": {
        icon: ({ className }) => <ClockIcon className={className} />,
        label: "Hours"
    },

    "google_analytics": {
        icon: ({ className }) => <EyeIcon className={className} />,
        label: "Pageviews / Month"
    },

    "google_play": {
        icon: ({ className }) => <DownloadIcon className={className} />,
        label: "Downloads"
    },

    "npm": {
        icon: ({ className }) => <DownloadIcon className={className} />,
        label: "Downloads / Month"
    }
}

const useStyles = makeStyles(theme => ({
    container: {
        width: 330,
        color: theme.palette.common.black
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
        paddingTop: 330 * 9 / 16 // 16:9
    },

    content: {
        paddingBottom: 0,
        height: 60
    },

    apiItem: {
        width: "unset"
    },

    link: {
        textDecoration: "none"
    },

    icon: {
        fontSize: 18,
        color: theme.palette.text.secondary
    }
}))

function ProjectCard({ data }) {
    const classes = useStyles()

    const thumbnail = data.assets?.find(asset => asset.type === "thumbnail")

    return (
        <Card className={classes.container}>
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
                image={thumbnail ? window.origin + thumbnail.path : placeholderImage}
                className={classes.image}
            />

            <CardContent className={classes.content}>
                <Grid item container wrap="nowrap" spacing={2}>
                    {Object.entries(apiLabelMap).map(([api, { icon, label }]) => data.apis[api] && (
                        <Tooltip title={label} key={api}>
                            <Grid item container direction="column" alignItems="center" justify="space-between" className={classes.apiItem}>
                                <Grid item>
                                    {React.createElement(icon, { className: classes.icon })}
                                </Grid>

                                <Grid item>
                                    {data.apis[api].data}
                                </Grid>
                            </Grid>
                        </Tooltip>
                    ))}
                </Grid>
            </CardContent>

            <CardActions>
                <Link to={"/project/" + data.slug} className={classes.link}>
                    <Button size="small" color="primary">
                        Details
                    </Button>
                </Link>

                <Button size="small" color="primary" href={data.website} target="_blank">
                    Open
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProjectCard