import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TextSearchBar from '../text-search-bar';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Text Search Bar Component', () => {
    const page = (loading: boolean, handleSearch: () => void) => (
        <div>
            <TextSearchBar loading={loading} handleSearch={handleSearch} />
        </div>
    );

    it('It should call the handleSearch function when a query is submitted', async () => {
        const handleSearchMock = vi.fn();
        render(page(false, handleSearchMock));

        const input = screen.getByPlaceholderText('Buscar en monografías...');
        const button = screen.getByRole('button');

        await userEvent.type(input, 'test query');
        await userEvent.click(button);

        await waitFor(() => {
            expect(handleSearchMock).toBeCalledTimes(1);
        });
    });

    it('It should not call the handleSearch function when the input is invalid', async () => {
        const handleSearchMock = vi.fn();
        render(page(false, handleSearchMock));

        const input = screen.getByPlaceholderText('Buscar en monografías...');
        const button = screen.getByRole('button');

        await userEvent.click(button);

        await waitFor(() => {
            expect(handleSearchMock).toBeCalledTimes(0);
        });

        await userEvent.type(input, 'abc');
        await waitFor(() => {
            expect(handleSearchMock).toBeCalledTimes(0);
        });
    });

    it('It should not submit the form when loading', async () => {
        const handleSearchMock = vi.fn();
        render(page(true, handleSearchMock));

        const input = screen.getByPlaceholderText('Buscar en monografías...');
        const button = screen.getByRole('button');

        await userEvent.type(input, 'test query');
        await userEvent.click(button);

        await waitFor(() => {
            expect(handleSearchMock).toBeCalledTimes(0);
        });

        input.focus();
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

        await waitFor(() => {
            expect(handleSearchMock).toBeCalledTimes(0);
        });
    });
});
