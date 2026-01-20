import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Button } from 'primereact/button';
import userEvent from '@testing-library/user-event';
import AppTopbar from '../app-topbar';
import { DummyApp } from '../../test';
import useAppStore from '../../hooks/use-app-store';

describe('App Topbar component', () => {
    const Page: React.FC = () => {
        const { updateLoginData } = useAppStore();

        return (
            <DummyApp path="/" routes={['/account/login', '/account/logout']}>
                <Button
                    onClick={() =>
                        updateLoginData(
                            {
                                fullName: 'Test User',
                                firstName: 'Test',
                                lastName: 'User',
                            },
                            true,
                        )
                    }
                    label="Test"
                ></Button>
                <AppTopbar />
            </DummyApp>
        );
    };

    it('It should render correctly all elements', () => {
        render(<Page />);
        expect(screen.queryByAltText('BotaniQ Logo')).toBeInTheDocument();
        expect(screen.queryByText('BotaniQ')).toBeInTheDocument();
        expect(screen.queryByText('Iniciar sesión')).toBeInTheDocument();
        expect(screen.queryAllByRole('button')).toHaveLength(3);
    });

    it('It should route the user to the login screen when the login button is clicked', async () => {
        render(<Page />);
        expect(screen.queryByText('Iniciar sesión')).toBeInTheDocument();

        const loginButton = screen.queryAllByRole('button')[2];
        await userEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.queryByText('/account/login')).toBeInTheDocument();
        });
    });

    it('It should display the users full name when logged in and have a logout button', async () => {
        render(<Page />);
        const testButton = screen.getByText('Test');
        await userEvent.click(testButton);

        await waitFor(() => {
            expect(screen.queryByText('Test User')).toBeInTheDocument();
        });

        const logoutButton = screen.queryAllByRole('button')[2];
        await userEvent.click(logoutButton);
        await waitFor(() => {
            expect(screen.queryByText('/account/logout')).toBeInTheDocument();
        });
    });
});
