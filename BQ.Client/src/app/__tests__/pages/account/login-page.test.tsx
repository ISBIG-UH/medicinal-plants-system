import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { DummyApp } from '../../../../test';
import LoginPage from '../../../pages/account/login-page';

describe('Account Login Page', () => {
    const Page: React.FC = () => {
        return (
            <DummyApp path="/account/login" routes={['/']}>
                <LoginPage />
            </DummyApp>
        );
    };

    it('It should render without errors', () => {
        render(<Page />);
    });
});
