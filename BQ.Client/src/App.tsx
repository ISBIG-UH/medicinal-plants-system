import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'primereact/button'
import { Route, Routes } from 'react-router-dom'
import { spy } from 'mobx'
import { Login } from './features/account'
import AppLayout from './layout/app-layout'
import HomeComponent from './features/home'


function App() {
  const [count, setCount] = useState(0);


    // TODO: make this development environment only 
    spy(event => {
      if (event.type === "reaction") {
        console.log("MobX Reaction:", event);
      }
    });

  return (
    <>
       <Routes>
          <Route path="/" element={<AppLayout/>}>
              <Route index element={<HomeComponent/>}/>
          </Route>
          <Route path='/account/login' element={<Login/>}></Route>
          <Route path='/account/confirmation' element={<Login/>}></Route>

        </Routes>
    </>
  )
}

export default App
