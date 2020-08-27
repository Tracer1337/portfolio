import axios from "axios"

import format, {
    PROJECTS
} from "./formatAPI.js"
import { API_BASE_URL } from "./constants.js"

export function setTokenHeader(token) {
    axios.defaults.headers.common = {
        "Authorization": "Baerer " + token
    }
}

function url(path) {
    return API_BASE_URL + path
}

export const getTotalTechstack = () => axios.get(url("/resources/techstack"))
export const getProjects = () => axios.get(url("/resources/projects")).then(format(PROJECTS))
export const getAboutMeText = () => axios.get(url("/resources/aboutme"))