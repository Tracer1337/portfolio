import qs from "qs"

const baseUrl = "https://v2202104145753149514.ultrasrv.de:3800"

export function getStrapiUrl(path = "") {
    return `${baseUrl}${path}`
}

export async function fetchAPI(
    path: string,
    urlParamsObject: object = {},
    options: object = {}
) {
    const mergedOptions = {
        headers: {
            "Content-Type": "application/json"
        },
        ...options
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
