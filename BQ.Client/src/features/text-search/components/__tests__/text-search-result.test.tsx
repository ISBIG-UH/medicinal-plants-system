import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchResult from '../text-search-result';
import { getMonographMock } from '../../../../test';

describe('Text Search Result', () => {
    const page = (monograph: Monograph) => (
        <SearchResult monograph={monograph} />
    );

    it('It should correctly display the monograph data', async () => {
        const monograph = getMonographMock();
        monograph.hab = 'this is less than 150 characters';
        render(page(monograph));

        expect(screen.queryByText(monograph.name)).toBeInTheDocument();
        expect(
            screen.queryByText(
                `${monograph.genus} ${monograph.species} ${monograph.authors} ${monograph.var} ${monograph.subsp} ${monograph.f}`,
            ),
        );
        expect(screen.queryByText(monograph.hab)).toBeInTheDocument();
    });

    it('It should truncate the monograph hab when it is longer than 150 chars', async () => {
        const monograph = getMonographMock();
        monograph.hab =
            'Consectetur occaecat aliquip dolor irure magna proident nostrud id. Consectetur occaecat aliquip dolor irure magna proident nostrud id. Consectetur occaecat aliquip dolor irure magna proident nostrud id.';
        render(page(monograph));

        expect(
            screen.queryByText(monograph.hab.substring(0, 150) + '...'),
        ).toBeInTheDocument();
    });
});
