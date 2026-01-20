import { useContext, useEffect, useState } from 'react';
import { ServiceContainer, TYPES } from '../../../services/injection/container';
import { MessageServiceContext } from '../../../services/messages';
import { IUser } from '../../../types/user';
import { IUserService } from '../services/user-service';

export const useUserList = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const userService = ServiceContainer.get<IUserService>(TYPES.IUserService);
    const { messageService } = useContext(MessageServiceContext);

    const getUsers = async () => {
        setLoading(true);
        const result = await userService.getPage({}, messageService!);
        console.log(result);
        setUsers(result.items);
        setLoading(false);
    };

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        loading,
        users,
    };
};
