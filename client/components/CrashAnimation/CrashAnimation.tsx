/** @jsxImportSource @emotion/react */
import React, { useImperativeHandle, useRef } from "react"
import { css } from "@emotion/react"
import Image from "../Image"
import { useCrashAnimation } from "./animation"
import { Animation } from "../../lib/animation"
import moonImage from "../../assets/moon.png"
import spaceshipImage from "../../assets/nasa-rocket.png"

function CrashAnimation(
    props: React.ComponentProps<"div">,
    ref: React.ForwardedRef<Animation>
) {
    const spaceshipRef = useRef<HTMLImageElement>(null)
    const moonRef = useRef<HTMLImageElement>(null)
    const explosionRef = useRef<HTMLImageElement>(null)

    const animation = useCrashAnimation({
        spaceshipRef,
        moonRef,
        explosionRef
    })

    useImperativeHandle(ref, () => ({
        update: (progress) => animation?.seek(progress)
    }))
    
    return (
        <div
            css={css`
                position: relative;
                width: 500px;
                height: 300px;
            `}
            {...props}
        >
            <Image
                ref={moonRef}
                src={moonImage}
                alt="Moon"
                width={200}
                height={200}
                css={css`
                    position: absolute;
                    bottom: 0;
                `}
            />
            <img
                ref={explosionRef}
                alt="Explosion"
                css={css`
                    position: absolute;
                    bottom: 0;
                    display: none;
                `}
            />
            <Image
                ref={spaceshipRef}
                src={spaceshipImage}
                alt="NASA Rocket"
                width={98}
                height={102}
                css={css`
                    position: absolute;
                    left: 400px;
                    bottom: 100px;
                    transform: rotate(-80deg);
                `}
            />
        </div>
    )
}

export default React.forwardRef(CrashAnimation)
