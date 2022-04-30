/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react"
import { css } from "@emotion/react"

const stars = 1000

function Background() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
    
        if (!canvas) return

        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight

        const context = canvas.getContext("2d")

        if (!context) return

        context.fillStyle = "#fff"

        for (let i = 0; i < stars; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            const r = Math.random() * 2
            context.beginPath()
            context.ellipse(x, y, r, r, 0, 0, Math.PI * 2)
            context.fill()
        }
    }, [])
    
    return (
        <div css={css`
            // https://mycolor.space/gradient3?ori=to+right+top&hex=%23000000&hex2=%2302000A&hex3=%23000000&submit=submit
            background-image: linear-gradient(to right top, #000000, #020001, #030002, #040004, #040006, #040006, #040006, #040006, #040004, #030002, #020001, #000000);
            position: fixed;
            top: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            display: flex;
        `}>
            <canvas ref={canvasRef}/>
        </div>
    )
}

export default Background
