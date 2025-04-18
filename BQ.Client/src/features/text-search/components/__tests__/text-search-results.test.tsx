import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TextSearchResults from '../text-search-results';
import { getMonographMock } from '../../../../test';

describe('Text Search Results component', () => {
    const monographs = Array.from({ length: 3 }, (_v, k) => {
        const monograph = getMonographMock();
        monograph.name = `name_${k}`;
        return monograph;
    });

    const page = (loading: boolean, monographs: Monograph[]) => (
        <div>
            <TextSearchResults loading={loading} monographs={monographs} />
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
});
