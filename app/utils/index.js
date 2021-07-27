const sharp = require("sharp")

const config = require("../../config")

async function compressImage(buffer) {
    const image = sharp(buffer)
    const metadata = await image.metadata()
    const newWidth = metadata.width < config.maxImageWidth ? metadata.width : config.maxImageWidth

    return await image
        .resize(newWidth)
        .toFormat(config.imageFormat)
        .toBuffer()
}

module.exports = {
    compressImage
}
