import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from 'primereact/button'
import AppLayout from './layout/AppLayout'
import { Route, Routes } from 'react-router-dom'
import HomeComponent from './features/HomeComponent'
import { spy } from 'mobx'
import LoginComponent from './features/account/components/login-component'


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
          <Route path='/account/login' element={<LoginComponent/>}></Route>
          <Route path='/account/confirmation' element={<LoginComponent/>}></Route>

        </Routes>
    </>
  )
}

export default App
