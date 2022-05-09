type EventTarget = {
    addEventListener: (event: string, handler: EventHandler) => void,
    removeEventListener: (event: string, handler: EventHandler) => void
}

type EventHandler = (...args: any[]) => any

export function setListeners(
    target: EventTarget,
    handlers: [string, EventHandler][]
) {
    handlers.forEach(([event, handler]) => {
        target.addEventListener(event, handler)
    })
    return () => {
        handlers.forEach(([event, handler]) => {
            target.removeEventListener(event, handler)
        })
    }
}
