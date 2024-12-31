import { Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import Home from "./components/Home";


const routes = () => {
  const role = localStorage.getItem('role');
  return [
    { label: "Inicio", href: "/", component: role ? <Home /> : <LogIn /> },
    { label: "Login", href: "/login", component: <LogIn /> },
    { label: "Home", href: "/home", component: <Home /> },
  ]
}

function App() {
  return (
    <>
      <Routes>
        {routes().map((route) => (
          <Route
            key={route.label}
            path={route.href}
            element={route.component}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
