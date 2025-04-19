import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextSearchBox from '../text-search-box';
import { DummyApp } from '../../../../test';

describe('Text Search Box Component', () => {
    const page = () => (
        <DummyApp path="/search/text" routes={['/']}>
            <TextSearchBox />
        </DummyApp>
    );

    it('It should call the api and render the monographs', async () => {
        render(page());
        const input = screen.getByPlaceholderText('Buscar en monografías...');
        const button = screen.getByRole('button');

        await userEvent.type(input, 'ajo');
        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByText('name_0')).toBeInTheDocument();
            expect(screen.queryByText('name_1')).toBeInTheDocument();
            expect(screen.queryByText('name_2')).toBeInTheDocument();
        });
    });

    it('It should not call api or render anything if there is no query', async () => {
        render(page());
        const button = screen.getByRole('button');

        await userEvent.click(button);

        expect(screen.queryByText('name_0')).not.toBeInTheDocument();
        expect(screen.queryByText('name_1')).not.toBeInTheDocument();
        expect(screen.queryByText('name_2')).not.toBeInTheDocument();
    });

    it('It not render anything if the api call returns an empty list', async () => {
        render(page());
        const input = screen.getByPlaceholderText('Buscar en monografías...');
        const button = screen.getByRole('button');

        await userEvent.type(input, 'pera');
        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByText('name_0')).not.toBeInTheDocument();
            expect(screen.queryByText('name_1')).not.toBeInTheDocument();
            expect(screen.queryByText('name_2')).not.toBeInTheDocument();
        });
    });

    it('It should show the dialog when the user clicks the plant', async () => {
        render(page());
        const input = screen.getByPlaceholderText('Buscar en monografías...');
        const button = screen.getByRole('button');

        await userEvent.type(input, 'ajo');
        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByText('name_0')).toBeInTheDocument();
        });

        const plant = screen.getByText('name_0');
        await userEvent.click(plant);

        await waitFor(() => {
            expect(screen.queryAllByText('name_0')).toHaveLength(2);
        });
    });
});
