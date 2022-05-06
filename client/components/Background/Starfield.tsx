/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import Image from "../Image"
import starfieldImage from "../../assets/starfield.png"

function Starfield(
    { className }: React.ComponentProps<"div">,
    ref: React.ForwardedRef<HTMLDivElement>
) {
    return (
        <Image
            ref={ref}
            src={starfieldImage}
            alt="Starfield"
            layout="fill"
            className={className}
            css={css`
                height: 100%;
                & img {
                    object-fit: cover;
                }
            `}
        />
    )
}

export default React.forwardRef(Starfield)
