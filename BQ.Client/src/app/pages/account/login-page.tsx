import React from 'react';
import { Login } from '../../../features/account';
import LeafBackground from '../../app-leaf-background';

const LoginPage: React.FC = () => {
    return (
        <LeafBackground>
            <Login />
        </LeafBackground>
    );
};

export default LoginPage;
