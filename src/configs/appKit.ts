import { BaseWalletAdapter, SolanaAdapter } from '@reown/appkit-adapter-solana'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'

import { mainnet, solana, bitcoin, AppKitNetwork } from '@reown/appkit/networks'

import { SolflareWalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, solana, bitcoin]

// 0. Get projectId from https://cloud.reown.com
export const projectId = 'd149fd0b3fe44636121032492ed688e2' // TODO move sensitive info to .env variables

// 2. Create Solana adapter
export const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new PhantomWalletAdapter() as unknown as BaseWalletAdapter<string>, new SolflareWalletAdapter() as unknown as BaseWalletAdapter<string>]
})

// 1. Create the Wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId, 
  networks
})

// 2. Set up Bitcoin Adapter
export const bitcoinAdapter = new BitcoinAdapter({
  projectId
})

// 3. Set up the metadata - Optional
export const metadata = {
  name: 'LIFI-multichain-wallet',
  description: 'Multichain wallet implementation',
  url: 'https://example.com', // TODO: change it after deploy
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}