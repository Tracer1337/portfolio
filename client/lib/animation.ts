import { useRef } from "react"

export type Animation = {
  update: (progress: number) => void
}

export function useDoneCallback() {
  const isDone = useRef(false)

  return (progress: number, callback: () => any) => {
    if (progress < 1) {
      isDone.current = false
    } else if (!isDone.current) {
      isDone.current = true
      callback()
    }
  }
}
