import { useState } from 'react'
import './App.css'
import { TokenList } from './components/TokenList/TokenList'

function App() {

  return (
    <>
      <TokenList isLoading={false} />
    </>
  )
}

export default App
