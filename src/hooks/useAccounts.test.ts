import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useAccounts } from './useAcounts.ts';
import { useAppKitAccount, useWalletInfo, useAppKitState } from '@reown/appkit/react';
import { useConfig as useWagmiConfig } from 'wagmi';
import { disconnect } from 'wagmi/actions';
import { useWalletsState } from '../providers/WalletsProvider';

vi.mock('@reown/appkit/react', () => ({
  useAppKitAccount: vi.fn(),
  useWalletInfo: vi.fn(),
  useAppKitState: vi.fn(),
}));

vi.mock('wagmi', () => ({
  useConfig: vi.fn(),
}));

vi.mock('wagmi/actions', () => ({
  disconnect: vi.fn(),
}));

vi.mock('../providers/WalletsProvider', () => ({
  useWalletsState: vi.fn(),
}));

describe('useAccounts Hook', () => {
  const mockSetWalletsState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    (useAppKitAccount as jest.Mock).mockReturnValue({ address: '0x123' });
    (useWalletInfo as jest.Mock).mockReturnValue({ walletInfo: { icon: 'icon-url' } });
    (useAppKitState as jest.Mock).mockReturnValue({ selectedNetworkId: 'eip155:1' });
    (useWagmiConfig as jest.Mock).mockReturnValue({});
    (useWalletsState as jest.Mock).mockReturnValue({
      evm: { address: null, isConnected: false, icon: null },
      svm: { address: null, isConnected: false, icon: null },
      utxo: { address: null, isConnected: false, icon: null },
      setWalletsState: mockSetWalletsState,
    });
  });

  it('should be initialized with the correct wallet state', () => {
    const { result } = renderHook(() => useAccounts());
    expect(result.current.accounts.evm.isConnected).toBe(false);
  });

  it('should persists state to localStorage on initialization', () => {
    const mockStorage = { getItem: vi.fn(), setItem: vi.fn() };
    Object.defineProperty(window, 'localStorage', { value: mockStorage });
    renderHook(() => useAccounts());
    expect(mockStorage.getItem).toHaveBeenCalledWith('LIFI_CONNECTED_WALLETS');
  });

  it('should updates wallet state when address and network change', () => {
    renderHook(() => useAccounts());
    expect(mockSetWalletsState).toHaveBeenCalled();
  });

  it('should handles disconnecting from an ecosystem correctly', async () => {
    const { result } = renderHook(() => useAccounts());
    await act(async () => {
      await result.current.handleDisconnect('evm');
    });
    expect(disconnect).toHaveBeenCalled();
    expect(mockSetWalletsState).toHaveBeenCalled();
  });
});
