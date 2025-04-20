import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { DummyApp } from '../../test';
import AppSideBar from '../app-sidebar';
import { ROUTES } from '../routes';

describe('App Sidebar component', () => {
    const Page: React.FC = () => {
        return (
            <DummyApp path="/test" routes={Object.values(ROUTES)}>
                <AppSideBar />
            </DummyApp>
        );
    };

    it('It should render correctly all elements', () => {
        render(<Page />);
        expect(screen.queryByText('Administración')).toBeInTheDocument();
        expect(screen.queryByText('Búsqueda')).toBeInTheDocument();
        expect(screen.queryByText('Edición')).toBeInTheDocument();
        expect(screen.queryByText('Acerca')).toBeInTheDocument();

        expect(screen.queryByText('BotaniQ')).toBeInTheDocument();
        expect(
            screen.queryByText('Todos los derechos reservados'),
        ).toBeInTheDocument();
    });

    it('It should route to administration pages', async () => {
        render(<Page />);
        const admin = screen.getByText('Administración');
        await userEvent.click(admin);

        await waitFor(() => {
            expect(screen.queryByText('Usuarios')).toBeInTheDocument();
        });

        const userLink = screen.getByText('Usuarios');
        await userEvent.click(userLink);
        //TODO: finish this :)
    });

    const searchRoutes = [
        { label: 'Búsqueda de texto', route: ROUTES.TEXT_SEARCH },
        { label: 'Búsqueda por índice', route: ROUTES.INDEX_SEARCH },
        { label: 'Búsqueda de aplicación', route: ROUTES.APP_SEARCH },
    ];

    it.each(searchRoutes)(
        'It should have a link with label $label and route to $route',
        async ({ label, route }) => {
            render(<Page />);
            const admin = screen.getByText('Búsqueda');
            await userEvent.click(admin);

            await waitFor(() => {
                expect(screen.queryByText(label)).toBeInTheDocument();
            });

            const textSearchLink = screen.getByText(label);
            await userEvent.click(textSearchLink);

            await waitFor(() => {
                expect(screen.queryByText(route)).toBeInTheDocument();
            });
        },
    );
});
