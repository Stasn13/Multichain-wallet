import {
    Avatar,
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Typography,
} from '@mui/material'

interface TokenItemProps {
    token: any // TODO: define token type
    isBalanceLoading?: boolean
}

export const TokenItem: React.FC<TokenItemProps> = ({
    token,
    isBalanceLoading
}) => {
    return (
        <ListItem
            dense
        >
            <ListItemAvatar>
                <Avatar src={token.logoURI} alt={token.symbol}>
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
                    <Typography>{token.amount}</Typography>
                )
            }
        </ListItem>
    )
}


export const TokenListItemSkeleton = () => {
    return (
        <ListItem
            secondaryAction={<TokenAmountSkeleton />}
            disablePadding
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
                primary={<Skeleton variant="text" />}
                secondary={<Skeleton variant="text" />}
            />
        </ListItem>
    )
}

export const TokenAmountSkeleton: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}
        >
            <Skeleton variant="text" />
        </Box>
    )
}