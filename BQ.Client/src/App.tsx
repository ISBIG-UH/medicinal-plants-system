import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'primereact/button'
import AppLayout from './layout/AppLayout'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <AppLayout/>
    </>
  )
}

export default App
