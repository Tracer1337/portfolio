import React, { createContext, useContext, useState } from "react"

type AppContextValue = {
    layout: any,
    defaultSEO: any,
    isGameVisible: boolean,
    set: (partial: Partial<AppContextValue>) => void
}

const AppContext = createContext<AppContextValue>({} as any)

export function useAppContext() {
    return useContext(AppContext)
}

export function AppContextProvider({
    children,
    initialValue
}: React.PropsWithChildren<{
    initialValue: Omit<AppContextValue, "set">
}>) {
    const [value, setValue] = useState(initialValue)

    const set: AppContextValue["set"] = (partial) => {
        setValue((value) => ({ ...value, ...partial }))
    }

    return React.createElement(
        AppContext.Provider,
        { value: { ...value, set } },
        children
    )
}
