import { Box, Tab, Tabs } from '@mui/material'
import { useState, type FC } from 'react'
import { TokenList } from '../TokenList/TokenList';
import { ChainId, ChainType } from '@lifi/sdk';

interface TabPanelProps {
    children?: React.ReactNode;
    index: "EVM" | "SVM" | "UTXO";
    value: string;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{ padding: 0 }}
            role="tabpanel"
            hidden={value !== index}
            id={`token-list-${index}`}
            aria-labelledby={`token-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

export const TokenTabs: FC = () => {
    const [value, setValue] = useState("EVM");

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Ecosystem tabs">
                    <Tab label="Ethereum" value="EVM" sx={{ color: "#fff", outline: 0 }} />
                    <Tab label="Solana" value="SVM" sx={{ color: "#fff" }} />
                    <Tab label="Bitcoin" value="UTXO" sx={{ color: "#fff" }} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index="EVM">
                <TokenList
                    address="0x230cDe8909aeBBc48CfBDf6fCc9A642439d77F83"
                    chainType={ChainType.EVM}
                    chainId={ChainId.ETH}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index="SVM">
                <TokenList
                    address="8JXcC6FMugS7qyuM5tmhbjRyv8Vi25Bi4mbQ9tQ5rK9K"
                    chainType={ChainType.SVM}
                    chainId={ChainId.SOL}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index="UTXO">
                <TokenList
                    address="bc1q049u7hup4ycfszfc2lxrzfhuyde4k83554r6ea"
                    chainType={ChainType.UTXO}
                    chainId={ChainId.BTC}
                />
            </CustomTabPanel>
        </Box>
    )
}