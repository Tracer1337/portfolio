import { useEffect, useRef, useState } from "react"

export function useSelection({ length, onSelect }: {
    length: number,
    onSelect: (selection: number) => void
}) {
    const selectionIndicatorRef = useRef<HTMLDivElement>(null)

    const [selection, setSelection] = useState(0)

    useEffect(() => {
        if (selectionIndicatorRef.current) {
            selectionIndicatorRef.current.style.transform = `
                translateX(${selection * 300}px)
            `
        }
    }, [selection])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") {
                setSelection(Math.min(selection + 1, length - 1))
            } else if (event.key === "ArrowLeft") {
                setSelection(Math.max(selection - 1, 0))
            } else if (event.key === "Enter") {
                onSelect(selection)
            }
        }
        
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [selection, setSelection])

    return selectionIndicatorRef
}
