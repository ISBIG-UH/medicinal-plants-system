import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [msg, setMsg] = useState("")

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/test/")
    .then(response => {
      setMsg(response.data.data);
      console.log(`Received: ${response.data.data}`)
    })
    .catch(error => {
      console.log(error);
    });
  }, [])
  

  return (
    <>
      <h1 className='text-4xl'>Hello World!</h1>
      <p>{msg}</p>
    </>
  )
}

export default App
