import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import NavMenu from './components/NavMenu';


function App() {
  return (
    <>
      <NavMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      
    </>
  )
}

export default App
