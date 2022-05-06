import React from "react"
import Script from "next/script"

export function ScrollMagicScript() {
    if (
        process.env.NODE_ENV !== "development" &&
        typeof window !== "undefined"
    ) {
        window.ScrollMagic = require("scrollmagic")
    }

    if (process.env.NODE_ENV === "development") {
        return React.createElement(
            React.Fragment,
            null,
            React.createElement(Script, {
                src: "https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js",
                strategy: "beforeInteractive"
            }),
            React.createElement(Script, {
                src: "https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js",
                strategy: "beforeInteractive"
            })
        )
    }

    return null
}
