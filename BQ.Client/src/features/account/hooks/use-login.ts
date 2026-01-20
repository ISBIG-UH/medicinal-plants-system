import { useState } from 'react';
import { IAccountService } from '../services/account-service';
import { LoginRequest } from '../types/authentication';
import { MessageService } from '../../../services/messages';
import { ServiceContainer, TYPES } from '../../../services/injection/container';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const accountService: IAccountService =
        ServiceContainer.get<IAccountService>(TYPES.IAccountService);

    async function handleLogin(
        login: LoginRequest,
        messageService: MessageService,
    ) {
        setLoading(true);
        try {
            const result = await accountService.login(login, messageService);
            return result;
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
