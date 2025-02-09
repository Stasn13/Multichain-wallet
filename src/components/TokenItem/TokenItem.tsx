import {
    type ListItemProps,
    Avatar,
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Typography,
} from '@mui/material';
import React from 'react';
import { formatUnits } from 'viem';

interface TokenItemProps extends ListItemProps {
    token: {
        name: string
        logoURI: string
        symbol: string
        amount: bigint
        decimals: number
    }
    isBalanceLoading?: boolean
};

export const TokenItem: React.FC<TokenItemProps> = React.memo(({
    token,
    isBalanceLoading,
    ...props
}) => {
    return (
        <ListItem
            dense
            {...props}
        >
            <ListItemAvatar>
                <Avatar
                    src={token.logoURI}
                    alt={token.symbol}
                >
                    {token.symbol?.[0]}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={token.symbol}
                secondary={
                    <Typography>{token.name}</Typography>
                }
            />
            {
                isBalanceLoading ? (
                    <TokenAmountSkeleton />
                ) : (
                    <Typography>{token?.amount ? formatUnits(token.amount, token.decimals) : ""}</Typography>
                )
            }
        </ListItem>
    )
})


export const TokenListItemSkeleton = ({ ...props }: ListItemProps) => {
    return (
        <ListItem
            secondaryAction={<TokenAmountSkeleton />}
            {...props}
        >
            <ListItemAvatar>
                <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ marginLeft: 1.5, marginRight: 2 }}
                />
            </ListItemAvatar>
            <ListItemText
                primary={<Skeleton variant="text" width={44} height={24} />}
                secondary={<Skeleton variant="text" width={64} height={24} />}
            />
        </ListItem>
    )
}

export const TokenAmountSkeleton: React.FC = () => {
    return (
        <Box>
            <Skeleton
                variant="text"
                width={40} height={24}
            />
        </Box>
    )
}