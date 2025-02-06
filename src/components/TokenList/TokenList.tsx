import { List, Paper } from '@mui/material'
import { useState, type FC } from 'react'
import { TokenItem, TokenListItemSkeleton } from '../TokenItem/TokenItem'
import { useGetTokenBalances } from '../../hooks/useGetTokenBalances';
import { containerHeight, itemHeight, itemsCount } from './TokenList.styles';


interface TokenListProps {
    // isLoading?: boolean
}

export const TokenList: FC<TokenListProps> = ({
    // isLoading,
}) => {

    const { tokens, tokenBalances, tokenLoading, balanceLoading } = useGetTokenBalances("0x230cDe8909aeBBc48CfBDf6fCc9A642439d77F83");
    const tokenItems = tokenBalances || tokens || []; // TODO move it to container, this component should be pure

    const [scrollTop, setScrollTop] = useState(0);
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
        startIndex + Math.ceil(containerHeight / itemHeight),
        tokenItems.length
    );
    const visibleItems = tokenItems.slice(startIndex, endIndex);
    const invisibleItemsHeight = (startIndex + visibleItems.length - endIndex) * itemHeight;
    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(event.currentTarget.scrollTop);
    };

    if (tokenLoading) {
        return (
            <List sx={{
                width: 480 // TODO: change it to 100% when container created
            }}>
                {Array.from({ length: itemsCount }).map((_, index) => (
                    <TokenListItemSkeleton
                        key={index}
                        sx={{ height: `${itemHeight}px` }}
                    />
                ))}
            </List>
        )
    }

    return (
        <Paper
            elevation={16}
            sx={{
                height: `${containerHeight - itemHeight}px`,
                overflowY: "scroll",
                width: 480 // TODO: change it to 100% when container created
            }}
            onScroll={handleScroll}
        >
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
            </div>
        </Paper>
    )
}