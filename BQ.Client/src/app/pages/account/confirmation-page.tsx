import React from 'react';
import { Confirmation } from '../../../features/account';
import LeafBackground from '../../app-leaf-background';

const ConfirmationPage: React.FC = () => {
    return (
        <LeafBackground>
            <Confirmation />
        </LeafBackground>
    );
};

export default ConfirmationPage;
