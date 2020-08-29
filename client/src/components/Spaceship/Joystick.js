import React, { useRef, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    joystick: {
        width: 200,
        height: 200,
        border: `1px solid ${theme.palette.common.white}`,
        borderRadius: "50%"
    },

    thumb: {
        width: 50,
        height: 50,
        backgroundColor: theme.palette.common.white,
        borderRadius: "50%",
        boxShadow: theme.shadows[3]
    }
}))

function Joystick({ eventTarget }) {
    const classes = useStyles()

    const joystickRef = useRef()
    const thumbRef = useRef()

    useEffect(() => {
        const joystick = joystickRef.current
        const thumb = thumbRef.current

        const joystickRect = joystick.getBoundingClientRect()
        const thumbRect = thumb.getBoundingClientRect()
        
        const centerPosition = joystickRect.width / 2 - thumbRect.width / 2
        
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

            let x = clientX - joystickRect.x - thumbRect.width / 2
            let y = clientY - joystickRect.y - thumbRect.height / 2

            if (x < 0 || x + thumbRect.width > joystickRect.width) {
                x = position.x
            }

            if (y < 0 || y + thumbRect.height > joystickRect.height) {
                y = position.y
            }

            return { x, y }
        }

        const setThumbPosition = (newPosition) => {
            position.x = newPosition.x
            position.y = newPosition.y

            dispatch("thumbMove", normalizePosition(position))

            thumb.style.transform = `translate(${position.x}px, ${position.y}px)`
        }

        const handleTouchEnd = () => {
            setThumbPosition({ x: centerPosition, y: centerPosition })
        }

        const handleTouchMove = (event) => {
            event.preventDefault()

            const newPosition = getThumbPositionFromEvent(event)

            setThumbPosition(newPosition)
        }

        setThumbPosition({ x: centerPosition, y: centerPosition })

        joystick.addEventListener("touchend", handleTouchEnd)
        joystick.addEventListener("touchcancel", handleTouchEnd)
        joystick.addEventListener("touchmove", handleTouchMove, { passive: false })
        
        return () => {
            joystick.removeEventListener("touchend", handleTouchEnd)
            joystick.removeEventListener("touchcancel", handleTouchEnd)
            joystick.removeEventListener("touchmove", handleTouchMove, { passive: false })
        }
    }, [])

    return (
        <div className={classes.joystick} ref={joystickRef}>
            <div className={classes.thumb} ref={thumbRef}/>
        </div>
    )
}

export default Joystick