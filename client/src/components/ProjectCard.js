import React from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardMedia, CardContent, CardActions, Button, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import googlePlayIcon from "../assets/images/google_play.webp"
import placeholderImage from "../assets/images/placeholder-image.png"

/**
 * Assign icons / elements to every type
 */
const projectTypeElementMap = {
    "android-app": ({ className }) => <img src={googlePlayIcon} className={className} alt="Google Play"/>
}

const apiLabelMap = {
    "activity_analyzer": "Hours",
    "google_analytics": "Pageviews / Month",
    "google_play": "Downloads",
    "npm": "Downloads / Month"
}

const useStyles = makeStyles(theme => ({
    container: {
        width: 350,
        minHeight: 450,
        color: theme.palette.common.black
    },

    headerAction: {
        margin: 0
    },

    headerIcon: {
        width: 24
    },

    headerIconWrapper: {
        height: 32,
        display: "flex",
        alignItems: "center"
    },

    image: {
        paddingTop: 350 * 9 / 16 // 16:9
    },

    content: {
        height: 450 - (64 + 196 + 46) // Expand to full height
    },

    link: {
        textDecoration: "none"
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
                <Grid container spacing={2}>
                    <Grid xs={12} item>
                        <Typography variant="body2" gutterBottom noWrap>
                            { data.description }
                        </Typography>
                    </Grid>

                    { Object.entries(apiLabelMap).map(([api, label]) => data.apis[api] && (
                        <React.Fragment key={api}>
                            <Grid item xs={6}>
                                { label }
                            </Grid>

                            <Grid item xs={6}>
                                { data.apis[api].data }
                            </Grid>
                        </React.Fragment>
                    )) }
                </Grid>
            </CardContent>

            <CardActions>
                <Link to={"/project/" + data.id} className={classes.link}>
                    <Button size="small" color="primary">
                        Details
                    </Button>
                </Link>

                <Button size="small" color="primary" href={data.website} target="_blank">
                    Visit
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProjectCard