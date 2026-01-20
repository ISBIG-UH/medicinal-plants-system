import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TextSearchResultPlaceholder from '../text-search-result-placeholder';

describe('Text Search Result Placeholder', () => {
    const page = () => <TextSearchResultPlaceholder />;

    it('It should be comformed by three placeholders', async () => {
        render(page());

        const div = screen.getByTestId('text-search-result-placeholder');
        expect(div.children).toHaveLength(3);
    });
});
