const url = process.env.STRAPI_URL || "http://localhost:1337"

export function getAPIUrl(path: string) {
    return `${url}${path}`
}

export async function getProjects() {
    const res = await fetch(getAPIUrl("/projects"))
    return await res.json()
}

export async function getSkills() {
    const res = await fetch(getAPIUrl("/skills"))
    return await res.json()
}
