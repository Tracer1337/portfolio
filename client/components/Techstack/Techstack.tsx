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
            <h1>My Techstack</h1>
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
                    <div
                        key={i}
                        css={css`
                            width: 64px;
                            height: 88px;
                            margin: 16px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                        `}
                    >
                        <Image
                            src={getStrapiUrl(skill.attributes.icon.data.attributes.url)}
                            alt={skill.attributes.name}
                            width={40}
                            height={40}
                            css={css`margin-bottom: 8px;`}
                        />
                        <span>{skill.attributes.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Techstack
