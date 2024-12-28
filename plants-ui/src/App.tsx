import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';


const routes: RouteItem[] = [
  { label: "Inicio", href: "/", component: <HomePage /> },
  { label: "Sobre nosotros", href: "/sobre-nosotros", component: <AboutPage /> },
];

const navItems: NavItem[] = routes.map(route => ({ label: route.label, href: route.href }))


function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavMenu navItems={navItems} />
      <div className='flex-grow bg-background'>
        <Routes>
          {
            routes.map((route) => (
              <Route key={route.label} path={route.href} element={route.component} />
            ))
          }
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
