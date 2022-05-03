/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React from "react"
import { getStrapiUrl } from "../../lib/api"

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
                        <img
                            src={getStrapiUrl(skill.attributes.icon.data.attributes.url)}
                            alt={skill.attributes.name}
                            css={css`width: 40px; margin-bottom: 8px;`}
                        />
                        <span>{skill.attributes.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Techstack
