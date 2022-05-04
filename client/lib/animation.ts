import { useRef } from "react"

export type Animation = {
  update: (progress: number) => void
}

export function constrain(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function fix(element: HTMLElement, from: number, to: number) {
  element.style.transform = `translateY(${constrain(window.scrollY - from, 0, to - from)}px)`
}

export function animate(animation: Animation, from: number, to: number) {
  animation.update((constrain(window.scrollY, from, to) - from) / (to - from))
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
