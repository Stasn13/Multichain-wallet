import { ChainType, getTokens, getTokenBalances, ChainId, TokenAmount } from '@lifi/sdk'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react';
import { formatUnits } from 'viem';


/**
 * Returns the balances of tokens that address holds, tokens list and loaders state.
 * @param address - A wallet address.
 * @param chainType - Specify blockchain type.
 * @returns An object containing the tokens, balances and laoding state.
 */
export const useGetTokenBalances = (address: string | null, chainType: ChainType = ChainType.EVM, chainId: number = ChainId.ETH) => {

    const { data, isLoading: tokenLoading } = useQuery({
        queryKey: [`tokens-${chainType}`],
        enabled: !!address,
        queryFn: () =>
            getTokens({ chainTypes: [chainType], chains: [chainId] }),
    });
    const tokens = useMemo(() => Object.values(data?.tokens || []).reduce((acc, tokens) => acc.concat(tokens), []), [data]);
    const { data: tokenBalances, isLoading: balanceLoading } = useQuery({
        queryKey: [`tokenBalances-${chainType}`],
        enabled: !!tokens.length && !!address,
        queryFn: async () => {
            const balances = await getTokenBalances(address!, tokens);

            return balances.sort((a: TokenAmount, b: TokenAmount) =>
                Number.parseFloat(formatUnits(b.amount ?? 0n, b.decimals)) *
                Number.parseFloat(b.priceUSD ?? '0') -
                Number.parseFloat(formatUnits(a.amount ?? 0n, a.decimals)) *
                Number.parseFloat(a.priceUSD ?? '0'))
        },
        refetchInterval: 60_000,
    });

    return {
        tokens,
        tokenBalances,
        tokenLoading,
        balanceLoading
    }
}