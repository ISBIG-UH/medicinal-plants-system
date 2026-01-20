import { useState } from 'react';
import { IAccountService } from '../services/account-service';
import { MessageService } from '../../../services/messages';
import { ServiceContainer, TYPES } from '../../../services/injection/container';
import { AccountConfirmation } from '../types/authentication';

const useConfirm = () => {
    const [loading, setLoading] = useState(false);
    const accountService: IAccountService =
        ServiceContainer.get<IAccountService>(TYPES.IAccountService);

    async function handleConfirm(
        accountConfirmation: AccountConfirmation,
        messageService: MessageService,
    ) {
        setLoading(true);
        try {
            return await accountService.confirm(
                accountConfirmation,
                messageService,
            );
        } finally {
            setLoading(false);
        }
    }

    return {
        handleConfirm: handleConfirm,
        loading,
    };
};

export default useConfirm;
