import { QueryClientProvider } from "@tanstack/react-query"
import { FC, PropsWithChildren } from "react"
import { queryClient } from "../configs/queryClient"
import { WagmiProvider } from "./WagmiProvider"
import { WalletsProvider } from "./WalletsProvider"
import { SolanaWalletProvider } from "./SolanaProvider"
import {
    bitcoinAdapter,
    networks,
    solanaWeb3JsAdapter,
    wagmiAdapter,
    metadata,
    projectId
} from '../configs/appKit';
import { createAppKit } from '@reown/appkit/react';

export const modal = createAppKit({
    enableWalletConnect: true,
    adapters: [wagmiAdapter, solanaWeb3JsAdapter, bitcoinAdapter],
    networks,
    metadata,
    projectId,
    features: {
        analytics: true,
        socials: false,
        email: false,
    },
    themeMode: "dark"
})

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <SolanaWalletProvider>
                <WagmiProvider>
                    <WalletsProvider>
                        {children}
                    </WalletsProvider>
                </WagmiProvider>
            </SolanaWalletProvider>
        </QueryClientProvider >
    )
}
