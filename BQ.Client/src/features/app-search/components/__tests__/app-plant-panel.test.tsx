import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DummyApp } from '../../../../test';
import AppPlantPanel from '../app-plant-panel';

describe('Text Search Box Component', () => {
    const page = (
        app: AppItem,
        onSelectedPlant: (plant: Monograph) => void,
    ) => (
        <DummyApp path="/search/text" routes={['/']}>
            <AppPlantPanel app={app} onSelectedPlant={onSelectedPlant} />
        </DummyApp>
    );

    it('It should call the api and render all the received plants', async () => {
        const onSelectedPlant = vi.fn((plant: Monograph) => {
            return plant.id;
        });

        render(page({ id: 1, name: 'app_1' }, onSelectedPlant));

        await waitFor(() => {
            expect(screen.queryByText('app_1')).toBeInTheDocument();
            expect(screen.queryByText('plant_0')).toBeInTheDocument();
            expect(screen.queryByText('plant_1')).toBeInTheDocument();
            expect(screen.queryByText('plant_2')).toBeInTheDocument();
        });
    });

    it('It should call the onSelectedPlant handler when a plant is clicked', async () => {
        const onSelectedPlant = vi.fn((plant: Monograph) => {
            return plant.id;
        });

        render(page({ id: 1, name: 'app_1' }, onSelectedPlant));

        await waitFor(() => {
            expect(screen.queryByText('plant_1')).toBeInTheDocument();
        });

        const button = screen.getByText('plant_1');
        await userEvent.click(button);
        await waitFor(() => {
            expect(onSelectedPlant).toBeCalledTimes(1);
        });

        const result = onSelectedPlant.mock.results.at(-1);
        expect(result?.value).toBe(1);
    });
});
