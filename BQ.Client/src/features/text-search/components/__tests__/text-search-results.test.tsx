import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import TextSearchResults from '../text-search-results';
import { getMonographMock } from '../../../../test';
import userEvent from '@testing-library/user-event';

describe('Text Search Results component', () => {
    const monographs = Array.from({ length: 3 }, (_v, k) => {
        const monograph = getMonographMock();
        monograph.name = `name_${k}`;
        monograph.id = k;
        return monograph;
    });

    const onSelectMonographMock = vi.fn((monograph: Monograph) => {
        return monograph.id;
    });

    const page = (loading: boolean, monographs: Monograph[]) => (
        <div>
            <TextSearchResults
                loading={loading}
                monographs={monographs}
                onSelectMonograph={onSelectMonographMock}
            />
        </div>
    );

    it('It should show the results if the component is not loading', async () => {
        render(page(false, monographs));

        expect(screen.queryByText('name_0')).toBeInTheDocument();
        expect(screen.queryByText('name_1')).toBeInTheDocument();
        expect(screen.queryByText('name_2')).toBeInTheDocument();
    });

    it('It should not show the results if the component is loading', async () => {
        render(page(true, monographs));

        expect(screen.queryByText('name_0')).not.toBeInTheDocument();
        expect(screen.queryByText('name_1')).not.toBeInTheDocument();
        expect(screen.queryByText('name_2')).not.toBeInTheDocument();
    });

    it('It should call the onSelectMonograph handler when a result is clicked', async () => {
        render(page(false, monographs));

        const plant = screen.getByText('name_0');
        await userEvent.click(plant);

        await waitFor(() => {
            expect(onSelectMonographMock).toBeCalledTimes(1);
        });

        const lastResult = onSelectMonographMock.mock.results.at(-1);
        expect(lastResult?.value).toBe(0);
    });
});
