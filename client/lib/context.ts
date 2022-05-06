import React, { createContext, useContext } from "react"

type AppContextValue = {
    layout: any,
    defaultSEO: any
}

const AppContext = createContext<AppContextValue>({} as any)

export function useAppContext() {
    return useContext(AppContext)
}

export function AppContextProvider({
    children,
    value
}: React.PropsWithChildren<{ value: AppContextValue }>) {
    return React.createElement(
        AppContext.Provider,
        { value },
        children
    )
}
