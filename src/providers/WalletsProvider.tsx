import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';

interface Ecosystem {
    imageUrl: string
    isConnected: boolean
    address: string | null
    icon: string | null
    name: WalletTypes
}

type WalletTypes = "evm" | "svm" | "utxo";

export type Wallets = Record<WalletTypes, Ecosystem>;

interface WalletsState extends Wallets {
    setWalletsState: React.Dispatch<React.SetStateAction<Wallets>> | null;
}

const initialContext = {
    evm: {
        imageUrl: "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg",
        isConnected: false,
        address: null,
        icon: null,
        name: "evm" as WalletTypes
    },
    svm: {
        imageUrl: "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/solana.svg",
        isConnected: false,
        address: null,
        icon: null,
        name: "svm" as WalletTypes
    },
    utxo: {
        imageUrl: "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/bitcoin.svg",
        isConnected: false,
        address: null,
        icon: null,
        name: "utxo" as WalletTypes
    },
    setWalletsState: null
}

export const WalletsContext = createContext<WalletsState>(initialContext);

export const useWalletsState = () => useContext(WalletsContext);

export const WalletsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [walletsState, setWalletsState] = useState<Wallets>(initialContext);
    return (
        <WalletsContext.Provider value={{ ...walletsState, setWalletsState }}>
            {children}
        </WalletsContext.Provider>
    )
}