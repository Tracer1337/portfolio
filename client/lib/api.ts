import qs from "qs"

const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"

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
        }
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

export const fetcher = (path: string, options: RequestInit) =>
    fetch(getStrapiUrl(path), options).then((res) => res.json())
