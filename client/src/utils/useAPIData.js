import { useState, useEffect, useReducer } from "react"

import * as API from "../config/api.js"

const cache = new Map()

function useAPIData(props) {
    props = {
        method: typeof props === "string" ? props : props.method,
        useCache: true,
        ...(typeof props === "object" ? props : {})
    }
    
    if (!props.method) {
        throw new Error("API Method not found")
    }

    const method = API[props.method].bind(null, props.data)

    const [isLoading, setIsLoading] = useState(!(props.defaultValue || cache.get(props.method)))
    const [error, setError] = useState()

    const [data, setData] = useReducer((state, newValue) => {
        cache.set(props.method, newValue)
        return newValue
    }, props.defaultValue || (props.useCache && cache.get(props.method)))

    const [version, reload] = useReducer((key) => key + 1, 0)

    useEffect(() => {
        if (data && version === 0) {
            return
        }

        setIsLoading(true)

        method()
            .then(res => {
                setData(res.data)
                setError(null)
                setIsLoading(false)

                if (props.onLoad) {
                    props.onLoad(res.data)
                }
            })
            .catch(error => {
                setData(null)
                setError(error)
                setIsLoading(false)
            })
        // eslint-disable-next-line
    }, [version])

    return {
        isLoading,
        data,
        error,
        reload
    }
}

export default useAPIData