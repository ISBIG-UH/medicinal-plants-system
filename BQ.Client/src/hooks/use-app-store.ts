import { useState } from "react";
import { ServiceContainer } from "../services/container";
import { AppStore } from "../layout/AppStore";
import { IUser } from "../features/account/types/user";

const useAppStore = () => {
  const [loading, setLoading] = useState(false);
    const appStore = ServiceContainer.get(AppStore);

  async function updateLoginData(user: IUser, isLoggedIn: boolean) {
    appStore.updateField("currentUser", user);
    appStore.updateField("isLoggedIn", isLoggedIn);
  }

  return {
    updateLoginData
  };
};

export default useAppStore;
