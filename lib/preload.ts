import { useEffect } from "react"

export function useImagePreload(sources: string[]) {
    useEffect(() => {
        sources.forEach((src) => {
            new Image().src = src
        })
    }, [])
}
