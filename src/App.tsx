import { TokenList } from './components/TokenList/TokenList'
import { WalletsController } from './components/WalletsController/WalletsController';
import { RootProvider } from './providers/RootProvider';

function App() {
  /**
   * BACKLOG:
   *
   * 1. Create git repo  
   * 2. Deploy to Vercel
   * 3. Enhance mobile responsiveness
   * 4. Install LI.FI SDK (any objections to use API instead?)
   * 5. Figure out way to connect wallets (wagmi or wallet abstraction through viem or LI.FI SDK?)
   * 6. Write tests
   * 7. Write docs
   * 8. Error and loading states handling
   * 9. add README.md
   */


  return (
    <RootProvider>
      <WalletsController/>
      <TokenList />
    </RootProvider>
  )
}

export default App
