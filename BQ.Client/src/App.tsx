import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'primereact/button'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-red'>Hello</h1>
      <Button label='hello'></Button>
    </>
  )
}

export default App
