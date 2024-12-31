import { useState } from "react";
import { setUser } from "../localStorageIntermediate";

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  function handleLogIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    
    console.log(username)
    console.log(password)
    // Request to server ////////
    // 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨//
    // ////////////////////////

    const response = { type: "success", msg: "Inicio de sesión exitoso"};
    const authorizedUser: User = { username: "Admin", role: "Administrador", sessionToken: "este-es-el-token-de-sesion" }
    setUser(authorizedUser)

    window.location.href = "/"
    return response;
  }

  return {
    showPassword,
    setShowPassword,
    handleLogIn,
  };
};

export default useLogin;
