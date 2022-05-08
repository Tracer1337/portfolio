/** @jsxImportSource @emotion/react */
import React, { useImperativeHandle, useRef } from "react"
import { css } from "@emotion/react"
import Starfield from "./Starfield"
import { useParallaxAnimation } from "./animation"
import { Animation } from "@lib/animation"

function Background(
    props: React.ComponentProps<"div">,
    ref: React.ForwardedRef<Animation>
) {
    const targetRef1 = useRef<HTMLDivElement>(null)
    const targetRef2 = useRef<HTMLDivElement>(null)

    const animation = useParallaxAnimation({ targetRefs: [targetRef1, targetRef2] })

    useImperativeHandle(ref, () => ({
        update: (progress) => animation?.seek(progress)
    }))

    return (
        <div
            css={css`
                // https://mycolor.space/gradient3?ori=to+right+top&hex=%23000000&hex2=%2302000A&hex3=%23000000&submit=submit
                background-image: linear-gradient(to right top, #000000, #020001, #030002, #040004, #040006, #040006, #040006, #040006, #040004, #030002, #020001, #000000);
                position: fixed;
                top: 0;
                width: 100vw;
                height: 100vh;
                z-index: -1;
            `}
            {...props}
        >
            <Starfield ref={targetRef1}/>
            <Starfield
                ref={targetRef2}
                css={css`transformY: 100%;`}
            />
        </div>
    )
}

export default React.forwardRef(Background)
