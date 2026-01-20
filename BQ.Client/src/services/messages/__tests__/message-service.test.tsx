import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useContext } from 'react';
import { Button } from 'primereact/button';
import { PrimeReactProvider } from 'primereact/api';
import ToastMessageServiceProvider from '../components/toast-message-service.provider';
import MessageServiceContext from '../classes/message-service.context';

describe('Message Service', () => {
    const DummyComponent: React.FC = () => {
        const { messageService } = useContext(MessageServiceContext);
        return (
            <Button
                label="Test Message Service"
                onClick={() =>
                    messageService?.show({
                        severity: 'success',
                        summary: 'Message Service Works!',
                        detail: 'Success',
                    })
                }
            ></Button>
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

    it('The toast message should appear when the button is clicked', async () => {
        render(page());

        fireEvent.click(screen.getByText('Test Message Service'));

        await waitFor(() => {
            expect(
                screen.queryByText('Message Service Works!'),
            ).toBeInTheDocument();
        });
    });
});
