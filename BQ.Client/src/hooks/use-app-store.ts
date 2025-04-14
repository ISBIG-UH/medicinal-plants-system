import { useState } from 'react';
import { IUser } from '../features/account/types/user';
import { AppStore } from '../stores/app-store';
import { ServiceContainer } from '../services/injection/container';

const useAppStore = () => {
    const [loading, setLoading] = useState(false);
    const appStore = ServiceContainer.get(AppStore);

    async function updateLoginData(user: IUser, isLoggedIn: boolean) {
        appStore.updateField('currentUser', user);
        appStore.updateField('isLoggedIn', isLoggedIn);
    }

    return {
        updateLoginData,
    };
};

export default useAppStore;
