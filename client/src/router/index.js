import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import IndexPage from "../pages/IndexPage.js"
import ProjectPage from "../pages/ProjectPage.js"

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/project/:slug">
                    <ProjectPage/>
                </Route>

                <Route path="/">
                    <IndexPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router