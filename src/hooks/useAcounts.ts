import { useAppKitAccount, useWalletInfo } from '@reown/appkit/react'
import { useConfig as useWagmiConfig } from 'wagmi'
import { disconnect } from 'wagmi/actions'
import { useAppKitState } from '@reown/appkit/react';
import { useEffect } from "react";
import { useWalletsState, Wallets } from "../providers/WalletsProvider";


const LIFI_CONNECTED_WALLETS = "LIFI_CONNECTED_WALLETS";

export interface AccountsResult {
    accounts: Wallets
    handleDisconnect: (ecosystem: keyof Wallets) => void
}
// args?: UseAccountArgs
export const useAccounts = (): AccountsResult => {
    // const { disconnect } = useDisconnect();
    const wagmiConfig = useWagmiConfig()
    const { address } = useAppKitAccount();
    const { walletInfo } = useWalletInfo()
    const { evm, svm, utxo, setWalletsState } = useWalletsState();
    const { selectedNetworkId } = useAppKitState()
    const accounts = { evm, svm, utxo };

    const netwrokIds: { [key: string]: string } = {
        "bip122": "utxo",
        "solana": "svm",
        "eip155": "evm",
    }

    const handleDisconnect = async (ecosystem: keyof typeof netwrokIds) => {
        const selectedEcosystem = accounts[ecosystem as keyof typeof accounts];
        const updatedAccount = {
            ...selectedEcosystem,
            icon: null,
            address: null,
            isConnected: false
        };
        const accountsState = { ...accounts, [ecosystem]: updatedAccount };
        console.log("DISCONNECTING::", ecosystem)

        if (ecosystem === "evm") {
            await disconnect(wagmiConfig);
        }

        handlePersist.set(accountsState);
        setWalletsState!(accountsState)

    }

    const handlePersist = {
        set: (state: Wallets) => {
            localStorage.setItem(LIFI_CONNECTED_WALLETS, JSON.stringify(state));
        },
        get: () => localStorage.getItem(LIFI_CONNECTED_WALLETS)
    }

    useEffect(() => {
        const persistedState = handlePersist.get();
        if (persistedState) {
            console.log(JSON.parse(persistedState))
            setWalletsState!(JSON.parse(persistedState) as Wallets);
        }
    }, []);

    useEffect(() => {
        if (address && selectedNetworkId) {
            const networkId = netwrokIds[selectedNetworkId?.split(":")[0]];
            const selectedEcosystem = accounts[networkId as keyof typeof accounts];
            const updatedAccount = {
                ...selectedEcosystem,
                icon: walletInfo?.icon,
                address,
                isConnected: true
            };
            const accountsState = { ...accounts, [networkId]: updatedAccount };
            handlePersist.set(accountsState);
            setWalletsState!(accountsState);
        }
    }, [address, walletInfo?.icon])
    // subscribeAccount(console.log);
    // const events = useAppKitEvents()

    // console.log(events)

    // const { connected } = useWallet();

    // const { disconnect } = useDisconnect()

    // disconnect()

    return {
        accounts,
        handleDisconnect
    }
}