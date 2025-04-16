import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PrimeReactProvider } from 'primereact/api';
import { MemoryRouter, Route, Routes } from 'react-router';
import Login from '../login';
import { ToastMessageServiceProvider } from '../../../../services/messages';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as hooks from '../../hooks/use-login';
import { RouteDisplay } from '../../../../test';

describe('Login Comonent', () => {
    const App: React.FC = () => {
        return (
            <div>
                <MemoryRouter
                    initialEntries={[
                        '/',
                        '/account/login',
                        '/account/registration',
                    ]}
                    initialIndex={1}
                >
                    <PrimeReactProvider>
                        <ToastMessageServiceProvider>
                            <Routes>
                                <Route
                                    path="/"
                                    element={<RouteDisplay />}
                                ></Route>
                                <Route
                                    path="/account/login"
                                    element={<Login />}
                                ></Route>
                                <Route
                                    path="/account/registration"
                                    element={<RouteDisplay />}
                                ></Route>
                            </Routes>
                        </ToastMessageServiceProvider>
                    </PrimeReactProvider>
                </MemoryRouter>
            </div>
        );
    };

    it('It should call the api only when there are no input errors', async () => {
        const handleLoginMock = vi.fn();
        vi.spyOn(hooks, 'default').mockReturnValue({
            handleLogin: handleLoginMock,
            loading: false,
        });

        render(<App />);

        // Check that all the form's elements are being rendered
        screen.getByText('BotaniQ');
        const emailInput = screen.getByPlaceholderText('Ingrese su correo');
        const passwordInput = screen.getByPlaceholderText(
            'Ingrese su contraseña',
        );
        const button = screen.getByText('Iniciar sesión');

        // Check that the form is submitted when the inputs are correct
        await userEvent.type(emailInput, 'systemadmin@botaniq.org');
        await userEvent.type(passwordInput, '1234');
        await userEvent.click(button);
        await waitFor(() => {
            expect(handleLoginMock).toHaveBeenCalledTimes(1);
        });

        // Check that the form is not submitted when the email is empty
        await userEvent.clear(emailInput);
        fireEvent.click(button);
        await waitFor(() => {
            expect(handleLoginMock).toHaveBeenCalledTimes(1);
        });

        // Check that the form is not submitted when the email is not correctly formatted
        await userEvent.type(emailInput, 'this.is.not.an.email');
        fireEvent.click(button);
        await waitFor(() => {
            expect(handleLoginMock).toHaveBeenCalledTimes(1);
        });

        // Corrects the email
        await userEvent.clear(emailInput);
        await userEvent.type(emailInput, 'systemadmin@botaniq.org');

        // Check that the form is not submitted when the password is empty
        await userEvent.clear(passwordInput);
        fireEvent.click(button);
        await waitFor(() => {
            expect(handleLoginMock).toHaveBeenCalledTimes(1);
        });

        vi.restoreAllMocks();
    });

    it('It should redirect to home if the api call is successful', async () => {
        render(<App />);

        const emailInput = screen.getByPlaceholderText('Ingrese su correo');
        const passwordInput = screen.getByPlaceholderText(
            'Ingrese su contraseña',
        );
        const button = screen.getByText('Iniciar sesión');

        await userEvent.type(emailInput, 'systemadmin@botaniq.org');
        await userEvent.type(passwordInput, '1234');
        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByText('/')).toBeInTheDocument();
        });
    });

    it('It should redirect to the Registration component when the bottom link is clicked', async () => {
        render(<App />);

        const link = screen.getByText('registrarse aquí');
        await userEvent.click(link);

        await waitFor(() => {
            expect(
                screen.queryByText('/account/registration'),
            ).toBeInTheDocument();
        });
    });
});
