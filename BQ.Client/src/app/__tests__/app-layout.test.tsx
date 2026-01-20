import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { DummyApp } from '../../test';
import { ROUTES } from '../routes';
import AppLayout from '../app-layout';

describe('App Layout component', () => {
    const Page: React.FC = () => {
        return (
            <DummyApp path="/test" routes={Object.values(ROUTES)}>
                <AppLayout />
            </DummyApp>
        );
    };

    it('It should render both the topbar and the sidebar', () => {
        render(<Page />);

        expect(screen.queryByLabelText('Toggle sidebar')).toBeInTheDocument();
        expect(screen.queryByText('Administración')).toBeInTheDocument();
    });

    it('It should toggle the sidebar when clicking the burger button', async () => {
        render(<Page />);

        expect(screen.queryByText('Administración')).toBeInTheDocument();
        const burgerButton = screen.getByLabelText('Toggle sidebar');

        await userEvent.click(burgerButton);
        await waitFor(() => {
            expect(
                screen.queryByText('Administración'),
            ).not.toBeInTheDocument();
        });

        await userEvent.click(burgerButton);
        await waitFor(() => {
            expect(screen.queryByText('Administración')).toBeInTheDocument();
        });
    });
});
