import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DummyApp } from '../../../../test';
import AppList from '../app-list';

describe('Text Search Box Component', () => {
    const page = (onAppSelect: (app: AppItem) => void) => (
        <DummyApp path="/search/text" routes={['/']}>
            <AppList onAppSelect={onAppSelect} />
        </DummyApp>
    );

    it('It should render all the applications and filter then when searching', async () => {
        const onAppSelectMock = vi.fn((app: AppItem) => {
            return app.id;
        });
        render(page(onAppSelectMock));

        await waitFor(() => {
            expect(screen.queryByText('app_0')).toBeInTheDocument();
            expect(screen.queryByText('app_1')).toBeInTheDocument();
            expect(screen.queryByText('app_2')).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText('Buscar aplicación');
        await userEvent.type(input, '2');

        await waitFor(() => {
            expect(screen.queryByText('app_0')).not.toBeInTheDocument();
            expect(screen.queryByText('app_1')).not.toBeInTheDocument();
            expect(screen.queryByText('app_2')).toBeInTheDocument();
        });
    });

    it('It should return the id of the selected application', async () => {
        const onAppSelectMock = vi.fn((app: AppItem) => {
            return app.id;
        });
        render(page(onAppSelectMock));

        await waitFor(() => {
            expect(screen.queryByText('app_0')).toBeInTheDocument();
            expect(screen.queryByText('app_1')).toBeInTheDocument();
            expect(screen.queryByText('app_2')).toBeInTheDocument();
        });

        const app = screen.getByText('app_1');
        await userEvent.click(app);

        await waitFor(() => {
            // should be called 2 times: when first rendering and when selecting the app
            expect(onAppSelectMock).toHaveBeenCalledTimes(2);
        });

        // check that the handler is returning the correct id
        const lastResult = onAppSelectMock.mock.results.at(-1);
        expect(lastResult?.value).toBe(1);
    });
});
