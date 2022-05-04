/** @jsxImportSource @emotion/react */
import React, { useImperativeHandle, useRef } from "react"
import { css } from "@emotion/react"
import { useCrashAnimation } from "./animation"
import { Animation } from "../../lib/animation"

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
            <img
                src="/moon.png"
                ref={moonRef}
                css={css`
                    position: absolute;
                    bottom: 0;
                    width: 200px;
                    height: 200px;
                `}
            />
            <img
                ref={explosionRef}
                css={css`
                    position: absolute;
                    bottom: 0;
                `}
            />
            <img
                src="/nasa-rocket.png"
                ref={spaceshipRef}
                css={css`
                    position: absolute;
                    left: 400px;
                    bottom: 100px;
                    width: 98px;
                    height: 102px;
                    transform: rotate(-80deg);
                `}
            />
        </div>
    )
}

export default React.forwardRef(CrashAnimation)
