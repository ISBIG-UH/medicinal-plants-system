import { useState } from "react";
import { setUser } from "../localStorageIntermediate";
import { apiLogin } from "../services/apiServices";

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    
    const response = await apiLogin({ username, password });

    // Set user in local storage
    if (response.user){
      setUser(response.user);
    }
    
    // window.location.href = "/";

    // Return response for toastify
    return response.toastResponse;
  }

  return {
    showPassword,
    setShowPassword,
    handleLogIn,
  };
};

export default useLogin;
