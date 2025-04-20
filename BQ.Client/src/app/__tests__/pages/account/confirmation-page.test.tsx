import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { DummyApp } from '../../../../test';
import ConfirmationPage from '../../../pages/account/confirmation-page';

describe('Account Confirmation Page', () => {
    const Page: React.FC = () => {
        return (
            <DummyApp path="/account/confirmation" routes={['/']}>
                <ConfirmationPage />
            </DummyApp>
        );
    };

    it('It should render without errors', () => {
        render(<Page />);
    });
});
