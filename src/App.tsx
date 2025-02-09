import Box from '@mui/material/Box';
import { TokenTabs } from './components/TokenTabs/TokenTabs';
import { WalletsController } from './components/WalletsController/WalletsController';
import { RootProvider } from './providers/RootProvider';

function App() {
  /**
   * BACKLOG:
   *
   * 5. Document wallet connection in details
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
