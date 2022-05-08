/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Button from "../Button"
import { getStrapiUrl } from "../../lib/api"
import { breakpoints } from "../../lib/responsive"
import Image from "../Image"

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
            <h1 data-shootable css={css`margin-bottom: 64px;`}>
                My Projects
            </h1>
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
                        <h3 data-shootable css={css`margin: 0;`}>
                            {project.attributes.name}
                        </h3>
                        <a href={project.attributes.url} target="_blank">
                            <Button data-shootable>Open Project</Button>
                        </a>
                    </div>
                    <Image
                        src={getThumbnailURL(project)}
                        alt={project.attributes.name}
                        width={180}
                        height={100}
                        data-shootable
                        css={css`
                            width: 11.25em;
                            height: 6.25em;
                            & img {
                                object-fit: cover;
                            }
                        `}
                    />
                </div>
            ))}
        </div>
    )
}

export default Projects
