import { useState } from 'react';
import { IAccountService } from '../services/account-service';
import { IUser } from '../types/user';
import { MessageService } from '../../../services/messages';
import { ServiceContainer, TYPES } from '../../../services/injection/container';

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
