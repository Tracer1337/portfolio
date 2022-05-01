/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { getAPIUrl } from "../../lib/cms"
import Button from "../styled/Button"

function Projects({ projects }: { projects: any[] }) {
    const getThumbnailURL = (project: any) =>
        getAPIUrl(
            project.thumbnail.formats.small?.url ||
            project.thumbnail.url
        )
    
    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
        `}>
            <h1 css={css`margin-bottom: 64px;`}>My Projects</h1>
            {projects.map((project, i) => (
                <div
                    key={i}
                    css={css`
                        width: 600px;
                        margin-bottom: 48px;
                        display: flex;
                        justify-content: space-between;
                    `}
                >
                    <div css={css`
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    `}>
                        <h3 css={css`margin: 0;`}>{project.name}</h3>
                        <a href={project.url} target="_blank">
                            <Button>Open Project</Button>
                        </a>
                    </div>
                    <div css={css`
                        background-image: url("${getThumbnailURL(project)}");
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                        width: 180px;
                        height: 100px;
                    `}/>
                </div>
            ))}
        </div>
    )
}

export default Projects
