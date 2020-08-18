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

export function getModalImageDimensions(src) {
    return new Promise(resolve => {
        const img = new Image()

        img.onload = () => {
            const { naturalWidth: width, naturalHeight: height } = img

            /**
             * If the final height of the image will be larger than the modal,
             * constrain the height to maxHeight.
             */
            const maxWidth = (window.innerWidth <= 992 ? .8 : .5) * window.innerWidth
            const maxHeight = window.innerHeight * .5
            const imageRatio = height / width
            const finalHeight = maxWidth * imageRatio

            if (finalHeight > maxHeight) {
                resolve({
                    height: maxHeight
                })
            } else {
                resolve({
                    width: "100%"
                })
            }
        }

        img.src = src
    })
}