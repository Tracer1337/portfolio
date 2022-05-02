import React, { createContext, useContext } from "react"

const AppContext = createContext<any>({})

export function useAppContext() {
    return useContext(AppContext)
}

export function AppContextProvider({
    children,
    value
}: React.PropsWithChildren<{ value: any }>) {
    return React.createElement(
        AppContext.Provider,
        { value },
        children
    )
}
