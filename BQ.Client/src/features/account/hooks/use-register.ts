import { useState } from 'react';
import { TYPES, ServiceContainer } from '../../../services/container';
import { IAccountService } from '../services/account-service';
import { MessageService } from '../../messages';
import { IUser } from '../types/user';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const accountService: IAccountService =
        ServiceContainer.get<IAccountService>(TYPES.IAccountService);

    async function handleRegister(
        user: Partial<IUser>,
        messageService: MessageService,
    ) {
        setLoading(true);
        try {
            return await accountService.register(user, messageService);
        } finally {
            setLoading(false);
        }
    }

    return {
        handleRegister,
        loading,
    };
};

export default useRegister;
