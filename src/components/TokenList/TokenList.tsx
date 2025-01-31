import { List, Paper } from '@mui/material'
import type { FC } from 'react'
import { TokenItem } from '../TokenItem/TokenItem'

interface TokenListProps {
    isLoading?: boolean
}

export const TokenList: FC<TokenListProps> = ({
    isLoading,
}) => {

    if (isLoading) {
        return (
            <div>loading</div>
        )
    }

    return (
        <Paper elevation={16}>
            <List>
                <TokenItem token={{ name: "SOLANA", symbol: "SOL" }} />
            </List>
        </Paper>
    )
}