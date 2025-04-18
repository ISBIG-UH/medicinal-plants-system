import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DummyApp } from '../../../../test';
import AppSearch from '../app-search';

describe('AppSearch Component', () => {
    const page = () => (
        <DummyApp path="/search/app" routes={['/']}>
            <AppSearch />
        </DummyApp>
    );

    it('It should render the applications and the plants for the first one', async () => {
        render(page());

        await waitFor(() => {
            expect(
                screen.queryAllByText('app_0', { exact: true }),
            ).toHaveLength(2); // the button and the plants panel title
            expect(screen.queryByText('app_1')).toBeInTheDocument();
            expect(screen.queryByText('app_2')).toBeInTheDocument();

            expect(screen.queryByText('app_0_plant_0')).toBeInTheDocument();
            expect(screen.queryByText('app_0_plant_1')).toBeInTheDocument();
            expect(screen.queryByText('app_0_plant_2')).toBeInTheDocument();
        });
    });

    it('It should get the plants of the clicked application', async () => {
        render(page());

        await waitFor(() => {
            expect(screen.queryByText('app_1')).toBeInTheDocument();
        });

        const button = screen.getByText('app_1');
        await userEvent.click(button);

        await waitFor(() => {
            expect(
                screen.queryAllByText('app_1', { exact: true }),
            ).toHaveLength(2);
            expect(screen.queryByText('app_1_plant_0')).toBeInTheDocument();
            expect(screen.queryByText('app_1_plant_1')).toBeInTheDocument();
            expect(screen.queryByText('app_1_plant_2')).toBeInTheDocument();
        });
    });
});
