import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DummyApp } from '../../../../test';
import IndexSearchBox from '../index-search-box';

describe('Text Search Box Component', () => {
    const page = () => (
        <DummyApp path="/search/text" routes={['/']}>
            <IndexSearchBox />
        </DummyApp>
    );

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    it('It should render all the letters and load the monographs of the initial letter at creation', async () => {
        render(page());
        letters.forEach((l) => {
            expect(screen.queryByText(l)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.queryByText('name_0')).toBeInTheDocument();
            expect(screen.queryByText('name_1')).toBeInTheDocument();
            expect(screen.queryByText('name_2')).toBeInTheDocument();
        });
    });

    it('It should call api and get the monographs when clicking a letter', async () => {
        render(page());
        const button = screen.getByText('B');

        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByText('name_0')).toBeInTheDocument();
            expect(screen.queryByText('name_1')).toBeInTheDocument();
            expect(screen.queryByText('name_2')).toBeInTheDocument();
        });
    });

    it('It should not render anything if the api call returns an empty list', async () => {
        render(page());
        const button = screen.getByText('B');

        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByText('name_0')).not.toBeInTheDocument();
            expect(screen.queryByText('name_1')).not.toBeInTheDocument();
            expect(screen.queryByText('name_2')).not.toBeInTheDocument();
        });
    });
});
