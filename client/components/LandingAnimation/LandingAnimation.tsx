/** @jsxImportSource @emotion/react */
import React, { useImperativeHandle, useRef } from "react"
import { css } from "@emotion/react"
import Image from "@components/Image"
import { useLandingAnimation } from "./animation"
import { Animation } from "@lib/animation"
import marsImage from "@assets/mars.png"
import spaceshipImage from "@assets/spacex-rocket.png"

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
            <Image
                src={marsImage}
                alt="Mars"
                width={400}
                height={400}
                data-shootable
                css={css`
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    transform: rotate(-45deg);
                `}
            />
            <Image
                ref={spaceshipRef}
                src={spaceshipImage}
                alt="SpaceX Rocket"
                width={130}
                height={173}
                data-shootable
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
