import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as hooks from '../../hooks/use-register';
import { DummyApp } from '../../../../test';
import Registration from '../registration';

describe('Registration Component', () => {
    const page = () => (
        <DummyApp path="/account/registration" routes={['/']}>
            <Registration />
        </DummyApp>
    );

    const handleRegisterMock = vi.fn();

    it('It should render all elements', async () => {
        render(page());

        // title
        expect(screen.queryByText('BotaniQ')).toBeInTheDocument();

        // labels
        expect(screen.queryByText('Nombre')).toBeInTheDocument();
        expect(screen.queryByText('Apellidos')).toBeInTheDocument();
        expect(screen.queryByText('Correo electrónico')).toBeInTheDocument();

        // inputs
        expect(
            screen.queryByPlaceholderText('Ingrese su nombre'),
        ).toBeInTheDocument();
        expect(
            screen.queryByPlaceholderText('Ingrese sus apellidos'),
        ).toBeInTheDocument();
        expect(
            screen.queryByPlaceholderText('Ingrese su correo'),
        ).toBeInTheDocument();

        // button
        expect(screen.queryByText('Registrarse')).toBeInTheDocument();
    });

    it('It should submit the form only when there are no input errors', async () => {
        vi.spyOn(hooks, 'default').mockReturnValue({
            handleRegister: handleRegisterMock,
            loading: false,
        });

        render(page());

        const nameInput = screen.getByPlaceholderText('Ingrese su nombre');
        const lastNameInput = screen.getByPlaceholderText(
            'Ingrese sus apellidos',
        );
        const emailInput = screen.getByPlaceholderText('Ingrese su correo');
        const button = screen.getByText('Registrarse');

        // Check that the form is submitted when the inputs are correct
        await userEvent.type(nameInput, 'System');
        await userEvent.type(lastNameInput, 'Admin');
        await userEvent.type(emailInput, 'systemadmin@botaniq.org');

        await userEvent.click(button);
        await waitFor(() => {
            expect(handleRegisterMock).toBeCalledTimes(1);
        });

        // Check that the form is not submitted when the name is empty
        await userEvent.clear(nameInput);
        await userEvent.click(button);
        await waitFor(() => {
            expect(handleRegisterMock).toBeCalledTimes(1);
        });

        // Check that the form is not submitted when the last name is empty
        await userEvent.type(nameInput, 'System');
        await userEvent.clear(lastNameInput);
        await userEvent.click(button);
        await waitFor(() => {
            expect(handleRegisterMock).toBeCalledTimes(1);
        });

        // Check that the form is not submitted when the email is empty
        await userEvent.type(lastNameInput, 'Admin');
        await userEvent.clear(emailInput);
        await userEvent.click(button);
        await waitFor(() => {
            expect(handleRegisterMock).toBeCalledTimes(1);
        });

        // Check that the form is not submitted when the email is not correctly formatted
        await userEvent.type(emailInput, 'this.is.not.an.email');
        await userEvent.click(button);
        await waitFor(() => {
            expect(handleRegisterMock).toBeCalledTimes(1);
        });

        vi.restoreAllMocks();
    });

    it('It should display the success panel when the api call is successful', async () => {
        render(page());

        const nameInput = screen.getByPlaceholderText('Ingrese su nombre');
        const lastNameInput = screen.getByPlaceholderText(
            'Ingrese sus apellidos',
        );
        const emailInput = screen.getByPlaceholderText('Ingrese su correo');
        const button = screen.getByText('Registrarse');

        // Check that the success panel is shown when the api call is successful
        await userEvent.type(nameInput, 'System');
        await userEvent.type(lastNameInput, 'Admin');
        await userEvent.type(emailInput, 'systemadmin@botaniq.org');

        await userEvent.click(button);

        expect(
            screen.getByText('¡Solicitud de registro realizada con éxito!'),
        ).toBeInTheDocument();

        // Check the panel allows to return to home
        const back = screen.getByText('Regresar al inicio');

        await userEvent.click(back);
        await waitFor(() => {
            expect(screen.queryByText('/')).toBeInTheDocument();
        });
    });
});
