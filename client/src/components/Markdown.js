import React from "react"
import ReactMarkdown from "react-markdown"
import hljs from "highlight.js/lib/core"

import javascript from "highlight.js/lib/languages/javascript"
import scss from "highlight.js/lib/languages/scss"
import xml from "highlight.js/lib/languages/xml"
import python from "highlight.js/lib/languages/python"
import php from "highlight.js/lib/languages/php"

import "highlight.js/styles/github.css"

// Define syntax highlighting
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("scss", scss)
hljs.registerLanguage("xml", xml)
hljs.registerLanguage("python", python)
hljs.registerLanguage("php", php)

// Define custom renderers
const renderers = {
    code: ({ language, value }) => {
        let formatted = { value }

        if (hljs.getLanguage(language) && value) {
            formatted = hljs.highlight(language, value)
        }

        return (
            <pre className="code-block">
                <code dangerouslySetInnerHTML={{ __html: formatted.value }} />
            </pre>
        )
    },

    tableCell: ({ isHeader, children }) => {
        if (isHeader) {
            return children.length == 0 ? null : <th>{children}</th>
        }

        return <td>{children}</td>
    }
}

function Markdown(props) {
    return (
        <ReactMarkdown
            {...props}
            renderers={renderers}
            escapeHtml={false}
        />
    )
}

export default Markdown