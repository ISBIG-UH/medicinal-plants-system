import { Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./components/NotFoundPage";


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
        <Route path="*" element={<NotFoundPage/>} />
        {routes().map((route) => (
          <Route
            key={route.label}
            path={route.href}
            element={route.component}
          />
        ))}
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
