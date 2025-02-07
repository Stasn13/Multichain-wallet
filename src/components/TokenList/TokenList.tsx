import { List, Paper, Typography } from '@mui/material'
import { useMemo, useState, type FC } from 'react'
import { TokenItem, TokenListItemSkeleton } from '../TokenItem/TokenItem'
import { useGetTokenBalances } from '../../hooks/useGetTokenBalances';
import { containerHeight, itemHeight, itemsCount } from './TokenList.styles';
import { ChainType, ChainId } from '@lifi/sdk';
import React from 'react';

// The TokenList component is bottleneck of application performance. The token list is virtualised, token list virtualised, caluclations cached.

interface TokenListProps {
    address: string | null
    chainType: ChainType
    chainId: ChainId
}

export const TokenList: FC<TokenListProps> = React.memo(({
    address,
    chainType,
    chainId
}) => {
    const { tokens, tokenBalances, tokenLoading, balanceLoading } = useGetTokenBalances(address, chainType, chainId);
    const tokenItems = tokenBalances?.length ? tokenBalances : tokens || [];

    const [scrollTop, setScrollTop] = useState(0);

    // Optimise re-calculations using useMemo as this component is crucial
    const { startIndex, visibleItems, invisibleItemsHeight } = useMemo(() => {
        const start = Math.floor(scrollTop / itemHeight);
        const end = Math.min(start + Math.ceil(containerHeight / itemHeight), tokenItems.length);
        return {
            startIndex: start,
            endIndex: end,
            visibleItems: tokenItems.slice(start, end),
            invisibleItemsHeight: (start + (end - start)) * itemHeight,
        };
    }, [scrollTop, tokenItems]);
    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(event.currentTarget.scrollTop);
    };

    if (tokenLoading) {
        return (
            <Paper
                elevation={16}
                sx={{ backgroundColor: "#f5f5f5" }}
            >
                <List sx={{ width: "100%" }}>
                    {Array.from({ length: itemsCount }).map((_, index) => (
                        <TokenListItemSkeleton
                            key={index}
                            sx={{ height: `${itemHeight}px` }}
                        />
                    ))}
                </List>
            </Paper >
        )
    }

    return (
        <Paper
            elevation={16}
            sx={{
                height: `${containerHeight - itemHeight}px`,
                overflowY: "scroll",
                backgroundColor: "#f5f5f5",
                width: "100%"
            }}
            onScroll={handleScroll}
        >
            {!address ?
                <Typography
                    variant="h2"
                    fontSize={20}
                    p={4}
                    textAlign={"center"}
                    mt={26}
                    children="Please connect corresponding wallet"
                />
                :
                <div style={{ height: `${tokenItems.length * itemHeight - itemHeight}px` }}>
                    <List
                        sx={{
                            position: "relative",
                            height: `${visibleItems.length * itemHeight}px`,
                            top: `${startIndex * itemHeight}px`,
                        }}
                    >
                        {visibleItems.map((token) => (
                            <TokenItem
                                sx={{ height: `${itemHeight}px` }}
                                key={token.address}
                                token={token}
                                isBalanceLoading={balanceLoading}
                            />
                        ))}
                    </List>
                    <div style={{ height: `${invisibleItemsHeight}px` }} />
                </div>}
        </Paper>
    )
});
