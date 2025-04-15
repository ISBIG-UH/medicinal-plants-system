import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useContext } from 'react';
import { Button } from 'primereact/button';
import { PrimeReactProvider } from 'primereact/api';
import {
    MessageServiceContext,
    ToastMessageServiceProvider,
} from '../../messages';
import { BaseHttpResponsesHandler } from '../http-responses-handler';
import { mockAxiosError } from '../../../test';

const responseErrNetwork = mockAxiosError('ERR_NETWORK');
const response500Default = mockAxiosError('500');
const response500WithMessage = mockAxiosError('500', 'Internal server error');

describe('Base Http Responses Handler', () => {
    const DummyComponent: React.FC = () => {
        const { messageService } = useContext(MessageServiceContext);
        const responseHandler = new BaseHttpResponsesHandler(messageService!, {
            showSuccessMessage: true,
        });

        return (
            <div>
                <Button
                    label="Handle Success"
                    onClick={() => responseHandler.handleSuccess()}
                ></Button>
                <Button
                    label="Handle No-Connection"
                    onClick={() =>
                        responseHandler.handleError(responseErrNetwork)
                    }
                ></Button>
                <Button
                    label="Handle 500 Message"
                    onClick={() =>
                        responseHandler.handleError(response500WithMessage)
                    }
                ></Button>
                <Button
                    label="Handle 500 Default"
                    onClick={() =>
                        responseHandler.handleError(response500Default)
                    }
                ></Button>
            </div>
        );
    };

    const page = () => {
        return (
            <PrimeReactProvider>
                <ToastMessageServiceProvider>
                    <DummyComponent />
                </ToastMessageServiceProvider>
            </PrimeReactProvider>
        );
    };

    it('The handler should display the success message', async () => {
        render(page());

        fireEvent.click(screen.getByText('Handle Success'));

        await waitFor(() => {
            expect(screen.queryByText('Éxito')).toBeInTheDocument();
            expect(
                screen.queryByText('Operación realizada con éxito'),
            ).toBeInTheDocument();
        });
    });

    it('The handler should display the no-connection error message', async () => {
        render(page());

        fireEvent.click(screen.getByText('Handle No-Connection'));

        await waitFor(() => {
            expect(screen.queryByText('Error')).toBeInTheDocument();
            expect(
                screen.queryByText(
                    'No se ha podido establecer conexión con el servidor, por favor reintente la operación más tarde',
                ),
            ).toBeInTheDocument();
        });
    });

    it('The handler should display the server error message in a 500 code if it has any', async () => {
        render(page());

        fireEvent.click(screen.getByText('Handle 500 Message'));

        await waitFor(() => {
            expect(screen.queryByText('Error')).toBeInTheDocument();
            expect(
                screen.queryByText('Internal server error'),
            ).toBeInTheDocument();
        });
    });

    it('The handler should display the default error message in a 500 code', async () => {
        render(page());

        fireEvent.click(screen.getByText('Handle 500 Default'));

        await waitFor(() => {
            expect(screen.queryByText('Error')).toBeInTheDocument();
            expect(
                screen.queryByText(
                    'Ha ocurrido un error en el sitio web, por favor reintente la operación más tarde',
                ),
            ).toBeInTheDocument();
        });
    });
});
