import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import "devicon/devicon.min.css"

import store from "./store"
import App from "./App.js"
import * as serviceWorker from "./serviceWorker.js"
import "./index.css"

const theme = createMuiTheme({
    palette: {
        background: {
            // default: "#2979FF",
            default: "#FFFFFF"
        },

        text: {
            // primary: "#FFFFFF"
            primary: "#3a3a3a"
        }
    },

    typography: {
        // fontFamily: "Raleway, sans-serif"
    }
})

if (process.env.NODE_ENV === "development") {
    console.log(theme)
}

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
