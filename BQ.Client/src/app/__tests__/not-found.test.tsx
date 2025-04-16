import { describe, expect, it } from 'vitest';
import { DummyApp } from '../../test';
import NotFound from '../pages/not-found';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Not Found Page', () => {
    const page = () => (
        <DummyApp path="/something" routes={['/']}>
            <NotFound />
        </DummyApp>
    );

    it('It should redirect to the home page when the return button is clicked', async () => {
        render(page());

        const link = screen.getByText('Ir a Inicio');
        await userEvent.click(link);

        await waitFor(() => {
            expect(screen.queryByText('/')).toBeInTheDocument();
        });
    });
});
