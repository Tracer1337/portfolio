/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { getAPIUrl } from "../../lib/cms"

function Techstack({ skills }: {
    skills: any[]
}) {
    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            max-width: ${96 * 6}px;
        `}>
            <h1>My Techstack</h1>
            <div css={css`
                display: flex;
                flex-wrap: wrap;
            `}>
                {skills.map((skill) => (
                    <div
                        key={skill.name}
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
                            src={getAPIUrl(skill.icon.url)}
                            alt={skill.name}
                            css={css`width: 40px; margin-bottom: 8px;`}
                        />
                        <span>{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Techstack
