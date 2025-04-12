import { useState } from "react";
import { ServiceContainer } from "../../../services/container";
import { IAccountService } from "../services/account-service";
import { LoginRequest } from "../types/authentication";
import { MessageService } from "../../messages";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const accountService: IAccountService = ServiceContainer.get(IAccountService);

  async function handleLogin(login: LoginRequest, messageService: MessageService) {
    setLoading(true);
    try {
      const result = await accountService.login(login, messageService);
      return result;
    } catch (e){
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return {
    handleLogin,
    loading,
  };
};

export default useLogin;
