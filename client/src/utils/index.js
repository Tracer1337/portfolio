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

export function hslToRgb(h, s, l) {
    var r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}