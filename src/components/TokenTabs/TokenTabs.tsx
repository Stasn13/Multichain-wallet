import { Box, Tab, Tabs } from '@mui/material'
import { useState, type FC } from 'react'
import { TokenList } from '../TokenList/TokenList';
import { ChainId, ChainType } from '@lifi/sdk';
import { useAccounts } from '../../hooks/useAcounts';

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
    const { accounts } = useAccounts();

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
                width: "100%",
            }}
        >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="Ecosystem tabs">
                    <Tab label="Ethereum" value="EVM" sx={{ color: "#fff", outline: 0 }} />
                    <Tab label="Solana" value="SVM" sx={{ color: "#fff" }} />
                    <Tab label="Bitcoin" value="UTXO" sx={{ color: "#fff" }} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index="EVM">
                <TokenList
                    address={accounts.evm.address}
                    chainType={ChainType.EVM}
                    chainId={ChainId.ETH}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index="SVM">
                <TokenList
                    address={accounts.svm.address}
                    chainType={ChainType.SVM}
                    chainId={ChainId.SOL}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index="UTXO">
                <TokenList
                    address={accounts.utxo.address}
                    chainType={ChainType.UTXO}
                    chainId={ChainId.BTC}
                />
            </CustomTabPanel>
        </Box>
    )
}