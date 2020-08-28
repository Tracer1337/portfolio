import explosion from "../../assets/images/explosion.gif"

const EXPLOSION_MIN_HEIGHT = 50

/**
 * Build flex container
 */
function createContainer(rect) {
    const element = document.createElement("div")

    element.style.height = Math.max(EXPLOSION_MIN_HEIGHT, rect.height) + "px"
    element.style.width = rect.width + "px"
    element.style.display = "flex"
    element.style.justifyContent = "center"
    element.style.position = "absolute"
    element.style.top = "0"
    element.style.transform = `translate(${rect.x}px, ${rect.y}px)`

    return element
}

/**
 * Build gif element
 */
function createAnimation() {
    const animation = document.createElement("img")

    animation.src = explosion

    animation.style.height = "100%"

    return animation
}

function explode(element) {
    element.setAttribute("data-destroyed", true)
    element.style.visibility = "hidden"

    const rect = element.getBoundingClientRect()
    rect.y += document.documentElement.scrollTop

    const container = createContainer(rect)

    const animation = createAnimation()

    container.appendChild(animation)

    document.body.appendChild(container)

    setTimeout(() => {
        document.body.removeChild(container)
    }, 800)
}

export default { explode }