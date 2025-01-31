import { useState } from 'react'
import './App.css'
import { TokenList } from './components/TokenList/TokenList'

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
   * 
   */

  return (
    <>
      <TokenList isLoading={false} />
    </>
  )
}

export default App
