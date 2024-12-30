import { Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import Home from "./components/Home";

const routes: RouteItem[] = [
  { label: "Inicio", href: "/login", component: <LogIn /> },
  { label: "Home", href: "/", component: <Home /> },
];

function App() {
  return (
    <>
      <Routes>
        {routes.map((route) => (
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
