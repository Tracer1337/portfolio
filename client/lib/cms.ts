const url = process.env.STRAPI_URL || "http://localhost:1337"

export function getAPIUrl(path: string) {
    return `${url}${path}`
}

export async function getProjects() {
    const res = await fetch(getAPIUrl("/projects"))
    const entries: any[] = await res.json()
    return entries.reverse()
}

export async function getSkills() {
    const res = await fetch(getAPIUrl("/skills"))
    return await res.json()
}
