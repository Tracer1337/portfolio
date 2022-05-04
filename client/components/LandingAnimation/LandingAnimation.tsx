/** @jsxImportSource @emotion/react */
import React, { useImperativeHandle, useRef } from "react"
import { css } from "@emotion/react"
import { useLandingAnimation } from "./animation"
import { Animation } from "../../lib/animation"

function LandingAnimation(
    props: React.ComponentProps<"div">,
    ref: React.ForwardedRef<Animation>
) {
    const spaceshipRef = useRef<HTMLImageElement>(null)

    const animation = useLandingAnimation({ spaceshipRef })

    useImperativeHandle(ref, () => ({
        update: (progress) => animation?.seek(progress)
    }))
    
    return (
        <div
            css={css`
                position: relative;
                height: 500px;
                width: 500px;
            `}
            {...props}
        >
            <img
                src="/mars.png"
                css={css`
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 400px;
                    height: 400px;
                    transform: rotate(-45deg);
                `}
            />
            <img
                src="/spacex-rocket.png"
                ref={spaceshipRef}
                css={css`
                    position: absolute;
                    right: 600px;
                    bottom: 400px;
                    width: 130px;
                    height: 173px;
                    transform: rotate(120deg);
                `}
            />
        </div>
    )
}

export default React.forwardRef(LandingAnimation)
