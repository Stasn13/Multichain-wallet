import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { modal, useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useAppKitWallet } from '@reown/appkit-wallet-button/react'

import { useAccount } from 'wagmi'
import { useAccounts } from "../../hooks/useAcounts";


export const WalletsController: FC = () => {
    const acc = useAccount();
    const {} = useAccounts();
    console.log("ACC::", acc)

    if(!modal) {
        return <h1>laoding</h1>
    }


    return (
        <Box sx={{ background: "red", mb: 2 }}
            display="flex"
            flexDirection={"column"}
            alignItems={"flex-end"}
            // justifyContent={"right"}
            gap={2}>
            <Box

            >
                <Typography>
                    Connected:
                </Typography>
                <Box>SOL EVM</Box>
            </Box>
            <Button
                variant="contained"
                onClick={() => {
                    modal.open({ view: 'Connect' });
                }}
            >
                Connect Wallet
            </Button>
        </Box>
    )
}