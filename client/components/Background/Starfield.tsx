/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import Image from "@components/Image"
import starfieldImage from "@assets/starfield.png"

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
            objectFit="cover"
            css={css`height: 100%;`}
        />
    )
}

export default React.forwardRef(Starfield)
