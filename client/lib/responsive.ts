import { useCallback, useEffect, useMemo, useState } from "react"

export const breakpoints = {
    m: "(max-width: 1200px)",
    s: "(max-width: 800px)"
}

export function useMediaQuery(mediaQueryString: string) {
    const mediaQueryList = useMemo(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia(mediaQueryString)
        }
    }, [])

    const [matches, setMatches] = useState(mediaQueryList?.matches ?? false)

    const handleChange = useCallback((event: MediaQueryListEvent) => {
        setMatches(event.matches)
    }, [])
    
    useEffect(() => {
        mediaQueryList?.addEventListener("change", handleChange)
        return () => {
            mediaQueryList?.removeEventListener("change", handleChange)
        }
    }, [handleChange])

    return matches
}
