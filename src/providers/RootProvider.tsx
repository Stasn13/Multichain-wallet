import { QueryClientProvider } from "@tanstack/react-query"
import { FC, PropsWithChildren } from "react"
import { queryClient } from "../configs/queryClient"

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
