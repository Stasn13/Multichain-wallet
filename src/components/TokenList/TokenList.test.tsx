import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TokenList } from './TokenList.tsx';
import { ChainId, ChainType } from '@lifi/sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetTokenBalances } from '../../hooks/useGetTokenBalances';


const queryClient = new QueryClient();

vi.mock('../../hooks/useGetTokenBalances', () => ({
    useGetTokenBalances: vi.fn(),
}));

const mockUseGetTokenBalances = (overrides: any = {}) => ({
    tokens: [],
    tokenBalances: [],
    tokenLoading: false,
    balanceLoading: false,
    ...overrides,
});

const mockTokens = [
    { chainId: 1151111081099710, address: "11111111111111111111111111111111", symbol: "SOL", name: "SOL-test" },
    { chainId: 1151111081099710, address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", symbol: "USDC" },
    { chainId: 1151111081099710, address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", symbol: "USDT" }
];

const mockTokensBalances = [
    { chainId: 1151111081099710, address: "11111111111111111111111111111111", symbol: "SOL", name: "SOL-test", amount: 50000000000000000000n, decimals: 18 },
    { chainId: 1151111081099710, address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", symbol: "USDC", amount: 100000000000000000000n, decimals: 18 },
    { chainId: 1151111081099710, address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", symbol: "USDT", amount: 150000000000000000000n, decimals: 18 }
];

const largeMockTokenData = {
    tokens: Array.from({ length: 50 }, (_, i) => ({
        address: `0xToken${i}`,
        name: `Token ${i}`,
        symbol: `TK${i}`,
        logoURI: `https://example.com/${i}.png`,
    })),
    tokenBalances: [],
    tokenLoading: false,
    balanceLoading: true,
};

const renderTokenList = (children: React.ReactNode) => {
    render(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

describe('TokenList', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        (useGetTokenBalances as jest.Mock).mockReturnValue(mockUseGetTokenBalances);
    });

    it('should loads with empty state', async () => {
        renderTokenList(<TokenList address={null} chainType={ChainType.EVM} chainId={ChainId.ETH} />);
        expect(screen.getByTestId('not-connected').textContent).toBe("Please connect corresponding wallet");
    })

    it('should render tokens list when wallet connected', async () => {
        (useGetTokenBalances as jest.Mock).mockReturnValue(mockUseGetTokenBalances({ tokens: mockTokens }));
        renderTokenList(<TokenList address="0x123" chainType={ChainType.SVM} chainId={ChainId.SOL} />);

        expect(screen.getByText('SOL-test')).toBeDefined();
        expect(screen.getByText('USDC')).toBeDefined();
    })
    it('should displays token balances', async () => {
        (useGetTokenBalances as jest.Mock).mockReturnValue(mockUseGetTokenBalances({ tokenBalances: mockTokensBalances }));
        render(<TokenList address="0x123" chainType={ChainType.EVM} chainId={ChainId.ETH} />);

        expect(screen.getByText('100')).toBeDefined();
        expect(screen.getByText('50')).toBeDefined();
    })

    it('renders only visible items within the viewport', async () => {
        (useGetTokenBalances as jest.Mock).mockReturnValue(largeMockTokenData);

        render(<TokenList address="0x123" chainType={ChainType.EVM} chainId={ChainId.ETH} />);
        expect(screen.queryByText('Token 11')).toBeNull();
    });
})