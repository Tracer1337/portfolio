import React, { useRef, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"

import Vector2d from "./Game/Vector2d.js"

const useStyles = makeStyles(theme => ({
    joystick: {
        width: "100%",
        border: `1px solid ${theme.palette.common.white}`,
        borderRadius: "50%"
    },

    thumb: {
        width: "25%",
        height: "25%",
        backgroundColor: theme.palette.common.white,
        borderRadius: "50%",
        boxShadow: theme.shadows[3]
    }
}))

function Joystick({ eventTarget = new EventTarget() }) {
    const classes = useStyles()

    const joystickRef = useRef()
    const thumbRef = useRef()

    useEffect(() => {
        const joystick = joystickRef.current
        const thumb = thumbRef.current

        const joystickSize = joystick.offsetWidth
        joystick.style.height = joystickSize + "px"

        const joystickRect = joystick.getBoundingClientRect()
        const thumbRect = thumb.getBoundingClientRect()

        const centerPosition = joystickSize / 2
        const defaultPosition = {
            x: centerPosition - thumbRect.width / 2,
            y: centerPosition - thumbRect.width / 2
        }

        const position = {}

        const dispatch = (type, value) => {
            eventTarget.dispatchEvent(new CustomEvent(type, { detail: value }))
        }
        
        const normalizePosition = ({ x, y }) => {
            return {
                x: (x - centerPosition) / centerPosition,
                y: (y - centerPosition) / centerPosition
            }
        }

        const getThumbPositionFromEvent = (event) => {
            const { clientX, clientY } = event.touches[0]

            let x = clientX - joystickRect.x
            let y = clientY - joystickRect.y

            const normalized = normalizePosition({ x, y })

            const vector = new Vector2d([normalized.x, normalized.y])

            if (vector.abs() > 1) {
                vector.setMag(1)

                x = (vector.value[0] + 1) / 2 * joystickSize
                y = (vector.value[1] + 1) / 2 * joystickSize
            }

            x -= thumbRect.width / 2
            y -= thumbRect.height / 2

            return { x, y }
        }

        const setThumbPosition = (newPosition) => {
            position.x = newPosition.x
            position.y = newPosition.y

            dispatch("thumbMove", normalizePosition({
                x: position.x + thumbRect.width / 2,
                y: position.y + thumbRect.height / 2
            }))

            thumb.style.transform = `translate(${position.x}px, ${position.y}px)`
        }

        const handleTouchEnd = () => {
            setThumbPosition(defaultPosition)
        }

        const handleTouchMove = (event) => {
            event.preventDefault()

            const newPosition = getThumbPositionFromEvent(event)

            setThumbPosition(newPosition)
        }

        setThumbPosition(defaultPosition)

        joystick.addEventListener("touchend", handleTouchEnd)
        joystick.addEventListener("touchcancel", handleTouchEnd)
        joystick.addEventListener("touchmove", handleTouchMove, { passive: false })
        
        return () => {
            joystick.removeEventListener("touchend", handleTouchEnd)
            joystick.removeEventListener("touchcancel", handleTouchEnd)
            joystick.removeEventListener("touchmove", handleTouchMove, { passive: false })
        }

        // eslint-disable-next-line
    }, [])

    return (
        <div className={classes.joystick} ref={joystickRef}>
            <div className={classes.thumb} ref={thumbRef}/>
        </div>
    )
}

export default Joystick