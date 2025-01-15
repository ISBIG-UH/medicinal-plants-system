import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import AppPage from './components/AppPage';
import AboutPage from './components/AboutPage';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import NotFound from './components/NotFoundPage';


const routes: RouteItem[] = [
  { label: "Buscar planta", href: "/", component: <HomePage /> },
  { label: "Aplicaciones", href: "/aplicaciones", component: <AppPage /> },
  { label: "Sobre nosotros", href: "/sobre-nosotros", component: <AboutPage /> },
];

const navItems: NavItem[] = routes.map(route => ({ label: route.label, href: route.href }))


function App() {
  // Hook para obtener la ubicación actual
  const location = useLocation();
  const isNotFoundPage = routes.some(route => route.href === location.pathname);

  return (
    <div className='flex flex-col h-screen'>
      {isNotFoundPage && <div className='h-fit'>
        <NavMenu navItems={navItems} />
      </div>}
      <div className='flex-grow overflow-y-hidden'>
        <Routes>
          <Route path='*' element={<NotFound/>}/>
          {
            routes.map((route) => (
              <Route key={route.label} path={route.href} element={route.component} />
            ))
          }
        </Routes>
      </div>
      {isNotFoundPage && <div className='h-fit'>
        <Footer />
      </div>}
    </div>
  )
}

export default App
