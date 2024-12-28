import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import NavMenu from './components/NavMenu';


const routes: RouteItem[] = [
  { label: "Inicio", href: "/", component: <HomePage /> },
  { label: "¿Quiénes somos?", href: "/quienes-somos", component: <AboutPage /> },
];

const navItems: NavItem[] = routes.map(route => ({ label: route.label, href: route.href }))


function App() {
  return (
    <>
      <NavMenu navItems={navItems} />
      <Routes>
        {
          routes.map((route) => (
            <Route key={route.label} path={route.href} element={route.component} />
          ))
        }
      </Routes>
      
    </>
  )
}

export default App
