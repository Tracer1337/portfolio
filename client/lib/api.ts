import qs from "qs"

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL
const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

export function getStrapiUrl(path = "") {
    return `${baseUrl}${path}`
}

export async function fetchAPI(
    path: string,
    urlParamsObject: object = {},
    options: Partial<RequestInit> = {}
) {
    const mergedOptions = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        } as Record<string, string>
    }

    if (token) {
        mergedOptions.headers["Authorization"] = `Bearer ${token}`
    }

    const query = qs.stringify(urlParamsObject, {
        encodeValuesOnly: true
    })
    const url = getStrapiUrl(`/api${path}${query ? `?${query}` : ""}`)
    
    const res = await fetch(url, mergedOptions)

    if (!res.ok) {
        console.error(res.statusText)
        throw new Error("Failed to fetch api")
    }

    return await res.json()
}
