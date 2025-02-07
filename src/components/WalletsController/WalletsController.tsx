import { Avatar, Box, Button, Tooltip } from "@mui/material";
import { FC } from "react";
import { modal } from "@reown/appkit/react";
import { useAccounts } from "../../hooks/useAcounts";


export const WalletsController: FC = () => {
    const { accounts, handleDisconnect } = useAccounts();

    if (!modal) {
        return <h1>laoding</h1>
    }

    return (
        <Box sx={{ mb: 2 }}
            display="flex"
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={2}
        >
            <Box
                display="flex"
                gap={2}
            >
                {Object.values(accounts).map(({ imageUrl, isConnected, address, icon, name }) => (
                    <Tooltip
                        title={address || "Connect your wallet"}
                        arrow
                        key={name}
                    >
                        <div
                            style={{ position: "relative", cursor: isConnected ? "pointer" : "not-allowed" }}
                        >
                            <Avatar
                                src={imageUrl}
                                onClick={() => handleDisconnect(name)}
                                sx={{ opacity: isConnected ? 1 : 0.3 }}
                                alt={address || "wallet"}
                            />
                            {isConnected && icon &&
                                <Avatar
                                    src={icon}
                                    sx={{ width: 25, height: 25, position: "absolute", bottom: -5, right: -5 }}
                                />}
                        </div>
                    </Tooltip>
                ))}
            </Box>
            <Button
                variant="contained"
                onClick={() => {
                    modal!.open({ view: 'Connect' });
                }}
            >
                Connect Wallet
            </Button>
        </Box>
    )
}