import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as hooks from '../../hooks/use-confirm';
import { DummyApp } from '../../../../test';
import Confirmation from '../confirmation';

describe('Confirmation Component', () => {
    const page = () => (
        <DummyApp path="/account/confirmation" routes={['/account/login']}>
            <Confirmation />
        </DummyApp>
    );

    const handleConfirmMock = vi.fn();

    it('It should render all elements', () => {
        render(page());

        // title
        expect(screen.queryByText('BotaniQ')).toBeInTheDocument();

        // labels
        expect(screen.queryByText('Contraseña')).toBeInTheDocument();
        expect(screen.queryByText('Confirmación')).toBeInTheDocument();

        // inputs
        expect(
            screen.queryByPlaceholderText('Ingrese su contraseña'),
        ).toBeInTheDocument();
        expect(
            screen.queryByPlaceholderText('Confirme su contraseña'),
        ).toBeInTheDocument();

        // button
        expect(screen.queryByText('Confirmar')).toBeInTheDocument();
    });

    it('It should submit the form only when there are no input errors', async () => {
        vi.spyOn(hooks, 'default').mockReturnValue({
            handleConfirm: handleConfirmMock,
            loading: false,
        });

        render(page());

        const passwordInput = screen.getByPlaceholderText(
            'Ingrese su contraseña',
        );
        const confirmationInput = screen.getByPlaceholderText(
            'Confirme su contraseña',
        );
        const button = screen.getByText('Confirmar');

        // Check that the form is submitted when the inputs are correct
        await userEvent.type(passwordInput, 'Password123');
        await userEvent.type(confirmationInput, 'Password123');

        await userEvent.click(button);
        await waitFor(() => {
            expect(handleConfirmMock).toBeCalledTimes(1);
        });

        // Check that the form is not submitted when the passwords are empty
        await userEvent.clear(passwordInput);
        await userEvent.clear(confirmationInput);
        await userEvent.click(button);
        await waitFor(() => {
            expect(handleConfirmMock).toBeCalledTimes(1);
        });

        // Check that the form is not submitted when the passwords are week
        await userEvent.clear(passwordInput);
        await userEvent.clear(confirmationInput);

        await userEvent.type(passwordInput, 'password123');
        await userEvent.type(confirmationInput, 'password123');
        await userEvent.click(button);
        await waitFor(() => {
            expect(handleConfirmMock).toBeCalledTimes(1);
        });

        // Check that the form is not submitted when the passwords don't match
        await userEvent.clear(passwordInput);
        await userEvent.clear(confirmationInput);

        await userEvent.type(passwordInput, 'Password123');
        await userEvent.type(confirmationInput, 'Password234');
        await userEvent.click(button);
        await waitFor(() => {
            expect(handleConfirmMock).toBeCalledTimes(1);
        });

        vi.restoreAllMocks();
    });

    it('It should display the success panel when the api call is successful', async () => {
        render(page());

        const passwordInput = screen.getByPlaceholderText(
            'Ingrese su contraseña',
        );
        const confirmationInput = screen.getByPlaceholderText(
            'Confirme su contraseña',
        );
        const button = screen.getByText('Confirmar');

        // Check that the form is submitted when the inputs are correct
        await userEvent.type(passwordInput, 'Password123');
        await userEvent.type(confirmationInput, 'Password123');
        await userEvent.click(button);

        expect(
            screen.getByText('¡Su cuenta ha sido confirmada con éxito!'),
        ).toBeInTheDocument();

        // Check the panel allows to go to the login page
        const back = screen.getByText('aquí.');

        await userEvent.click(back);
        await waitFor(() => {
            expect(screen.queryByText('/account/login')).toBeInTheDocument();
        });
    });
});
