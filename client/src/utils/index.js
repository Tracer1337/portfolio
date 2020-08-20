import { gridSizeMap } from "../config/constants.js"

export function getImageDimensions(src) {
    return new Promise(resolve => {
        const img = new Image()

        img.onload = () => {
            resolve({
                width: img.naturalWidth,
                height: img.naturalHeight
            })
        }

        img.src = src
    })
}

export function getAmountOfRows() {
    for (let maxWidth in gridSizeMap) {
        if (window.innerWidth < maxWidth) {
            return gridSizeMap[maxWidth]
        }
    }
}

export function getDialogImageDimensions(src) {
    return new Promise(resolve => {
        const img = new Image()

        img.onload = () => {
            const { naturalWidth: width, naturalHeight: height } = img

            if (width > height) {
                resolve({
                    maxWidth: window.innerWidth - 128
                })
            } else {
                resolve({
                    maxHeight: window.innerHeight - 128
                })
            }
        }

        img.src = src
    })
}