/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Button from "../Button"
import { getStrapiUrl } from "../../lib/api"
import { breakpoints } from "../../lib/responsive"

function Projects({ projects }: { projects: any[] }) {
    const getThumbnailURL = (project: any) =>
        getStrapiUrl(
            project.attributes.thumbnail.data.attributes.formats?.small?.url ||
            project.attributes.thumbnail.data.attributes.url
        )

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 1000px;
            @media ${breakpoints.m} {
                width: 100vw;
                min-height: 0;
            }
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
                        @media ${breakpoints.m} {
                            width: 100%;
                            max-width: 800px;
                        }
                        @media ${breakpoints.s} {
                            width: calc(100% - 32px);
                        }
                    `}
                >
                    <div css={css`
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    `}>
                        <h3 css={css`margin: 0;`}>{project.attributes.name}</h3>
                        <a href={project.attributes.url} target="_blank">
                            <Button>Open Project</Button>
                        </a>
                    </div>
                    <div css={css`
                        background-image: url("${getThumbnailURL(project)}");
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                        width: 11.25em;
                        height: 6.25em;
                    `}/>
                </div>
            ))}
        </div>
    )
}

export default Projects
