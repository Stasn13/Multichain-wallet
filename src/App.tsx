import Box from '@mui/material/Box';
import { TokenList } from './components/TokenList/TokenList'
import { TokenTabs } from './components/TokenTabs/TokenTabs';
import { WalletsController } from './components/WalletsController/WalletsController';
import { RootProvider } from './providers/RootProvider';

function App() {
  /**
   * BACKLOG:
   *
   * 1. Create git repo  
   * 2. Deploy to Vercel
   * 5. Figure out way to connect wallets (wagmi or wallet abstraction through viem or LI.FI SDK?)
   * 6. Write tests
   * 7. Write docs
   * 8. Error and loading states handling
   * 9. add README.md
   * 10. test bitcoin support
   * 12. document solutions
   * 13. errors handling
   */

  return (
    <RootProvider>
      <Box
        sx={{
          width: "100vw",
          '@media (min-width:480px)': {
            width: 480,
          }
        }}
      >
        <WalletsController />
        <TokenTabs />
      </Box>
    </RootProvider >
  )
}

export default App
