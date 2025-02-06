import { ChainType, getTokens, getTokenBalances, getTokenBalance, getToken, ChainId, TokenAmount } from '@lifi/sdk'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react';
import { useSyncWagmiConfig } from '@lifi/wallet-management'
import { formatUnits } from 'viem';


/**
 * Returns the balances of tokens that address holds.
 * @param address - A wallet address.
 * @param chainType - Specify blockchain type.
 * @returns An object containing the tokens, balances and laoding state.
 */
export const useGetTokenBalances = (address: string, chainType: ChainType = ChainType.EVM, chainId: number = ChainId.ETH) => {
    const { data, isLoading: tokenLoading } = useQuery({
        queryKey: ['tokens'],
        queryFn: () =>
            getTokens({ chainTypes: [chainType], chains: [chainId] }),
    });
    const tokens = useMemo(() => Object.values(data?.tokens || []).reduce((acc, tokens) => acc.concat(tokens), []), [data]);
    const { data: tokenBalances, isLoading: balanceLoading } = useQuery({
        queryKey: ['tokenBalances'],
        enabled: !!tokens.length,
        queryFn: async () => {
            const balances = await getTokenBalances("0x230cDe8909aeBBc48CfBDf6fCc9A642439d77F83", tokens);

            return balances.sort((a: TokenAmount, b: TokenAmount) =>
                Number.parseFloat(formatUnits(b.amount ?? 0n, b.decimals)) *
                Number.parseFloat(b.priceUSD ?? '0') -
                Number.parseFloat(formatUnits(a.amount ?? 0n, a.decimals)) *
                Number.parseFloat(a.priceUSD ?? '0'))
        },
        refetchInterval: 60_000,
    });

    console.log("tokenBalances", tokenBalances, tokens)
    return {
        tokens,
        tokenBalances,
        tokenLoading,
        balanceLoading
    }
}