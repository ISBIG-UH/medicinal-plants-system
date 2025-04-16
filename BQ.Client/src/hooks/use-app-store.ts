import { useContext, useState } from 'react';
import { IUser } from '../features/account/types/user';
import { AppStore } from '../stores/app-store';
import { ServiceContainerContext } from '../services/injection/container';

const useAppStore = () => {
    const [loading, setLoading] = useState(false);
    const ServiceContainer = useContext(ServiceContainerContext);
    const store = ServiceContainer.get(AppStore);

    async function updateLoginData(user: Partial<IUser>, isLoggedIn: boolean) {
        store.updateField('currentUser', user);
        store.updateField('isLoggedIn', isLoggedIn);
    }

    return {
        updateLoginData,
        appStore: store,
    };
};

export default useAppStore;
