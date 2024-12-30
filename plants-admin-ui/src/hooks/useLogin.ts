import { useState } from "react";

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  function handleLogIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    alert(`Username: ${username} \nPassword: ${password}`);
    throw new Error("Function not implemented.");
  }

  return {
    showPassword,
    setShowPassword,
    handleLogIn,
  };
};

export default useLogin;
