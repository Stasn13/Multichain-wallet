import { FC, PropsWithChildren } from "react";
import { wagmiAdapter } from "../configs/appKit";
import {
  type Config,
  WagmiProvider as WagmiProviderContext,
  CreateConnectorFn,
  createConfig as createWagmiConfig,
  injected
} from 'wagmi'
import { ChainType, config, createConfig, EVM, getChains, Solana } from '@lifi/sdk'
import { mainnet } from 'viem/chains';
import { getWalletClient, switchChain } from '@wagmi/core';
import { createClient, http } from 'viem';
import { useSyncWagmiConfig /*, getConnectorClient, useConfig */ } from "@lifi/wallet-management";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@solana/wallet-adapter-react";
import { SignerWalletAdapter } from "@solana/wallet-adapter-base";

export const WagmiProvider: FC<PropsWithChildren> = ({ children }) => {
  // const bigmiConfig = useConfig();

  // List of Wagmi connectors
  // WalletConnect is added to allow most of popular wallets
  // @ts-ignore
  const connectors: CreateConnectorFn[] = [injected(), wagmiAdapter.wagmiConfig.connectors[1]]; // TODO filter to find walletConnect
  const { wallet } = useWallet();

  // Create Wagmi config with default chain and without connectors
  const wagmiConfig: Config = createWagmiConfig({
    chains: [mainnet],
    client({ chain }) {
      return createClient({ chain, transport: http() });
    }
  });

  createConfig({
    integrator: 'LIFI multiwallet',
    providers: [
      EVM({
        getWalletClient: () => getWalletClient(wagmiConfig),
        switchChain: async (chainId) => {
          const chain = await switchChain(wagmiConfig, { chainId });
          return getWalletClient(wagmiConfig, { chainId: chain.id });
        },
      }),
      Solana({
        async getWalletAdapter() {
          return wallet?.adapter as SignerWalletAdapter;
        },
      }),
      // UTXO({
      //   getWalletClient: () => getConnectorClient(bigmiConfig),
      // }),
    ],
    // We disable chain preloading and will update chain configuration in runtime
    preloadChains: false,
  })

  const { data: chains } = useQuery({
    queryKey: ['chains'] as const,
    queryFn: async () => {
      const chains = await getChains({
        chainTypes: [ChainType.EVM, ChainType.SVM, ChainType.UTXO],
      });
      // Update chain configuration for LI.FI SDK
      config.setChains(chains);
      return chains;
    },
  });

  useSyncWagmiConfig(wagmiAdapter.wagmiConfig, connectors, chains);

  return (
    <WagmiProviderContext config={wagmiAdapter.wagmiConfig as Config} reconnectOnMount={false}>
      {/* ...wagmiConfig,  */}
      {children}
    </WagmiProviderContext>
  )
}