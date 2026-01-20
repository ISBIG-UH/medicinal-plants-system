import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { DummyApp } from '../../../../test';
import RegistrationPage from '../../../pages/account/registration-page';

describe('Account Registration Page', () => {
    const Page: React.FC = () => {
        return (
            <DummyApp path="/account/registration" routes={['/']}>
                <RegistrationPage />
            </DummyApp>
        );
    };

    it('It should render without errors', () => {
        render(<Page />);
    });
});
