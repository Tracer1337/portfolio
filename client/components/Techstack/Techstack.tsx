/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import Image from "../Image"
import { getStrapiUrl } from "../../lib/api"
import { breakpoints } from "../../lib/responsive"

function Techstack({ skills, ...props }: React.ComponentProps<"div"> & {
    skills: any[]
}) {
    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                max-width: ${96 * 6}px;
            `}
            {...props}
        >
            <h1 data-shootable>My Techstack</h1>
            <div css={css`
                display: flex;
                flex-wrap: wrap;
                @media ${breakpoints.s} {
                    width: 100vw;
                    flex-wrap: nowrap;
                    overflow-x: scroll;
                }
            `}>
                {skills.map((skill, i) => (
                    <Image
                        key={i}
                        src={getStrapiUrl(skill.attributes.icon.data.attributes.url)}
                        alt={skill.attributes.name}
                        width={40}
                        height={40}
                        data-shootable
                        css={css`
                            min-width: 40px;
                            margin: 16px;
                        `}
                    />
                ))}
            </div>
        </div>
    )
}

export default Techstack
