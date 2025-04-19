import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { DummyApp, getMonographMock } from '../../../../test';
import PlantCard from '../plant-card';
import useAppStore from '../../../../hooks/use-app-store';
import React from 'react';
import { Button } from 'primereact/button';
import userEvent from '@testing-library/user-event';

describe('Plant Card component', () => {
    const onClickHandler = vi.fn();
    const onEditHandler = vi.fn();

    const Page: React.FC<{ monograph: Monograph }> = ({ monograph }) => {
        const { appStore } = useAppStore();

        return (
            <DummyApp path="/card" routes={['/']}>
                <Button
                    onClick={() => appStore.updateField('isEditMode', true)}
                    label="Edit"
                ></Button>
                <PlantCard
                    monograph={monograph}
                    onClickHandler={onClickHandler}
                    onEditHandler={onEditHandler}
                />
            </DummyApp>
        );
    };

    it('It should correctly display the monograph data', async () => {
        const monograph = getMonographMock();
        monograph.hab = 'this is less than 150 characters';
        render(<Page monograph={monograph} />);

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
        render(<Page monograph={monograph} />);

        expect(
            screen.queryByText(monograph.hab.substring(0, 150) + '...'),
        ).toBeInTheDocument();
    });

    it('It should not show an edit button when the application is not on edit mode', async () => {
        const monograph = getMonographMock();
        render(<Page monograph={monograph} />);

        expect(screen.queryAllByRole('button')).toHaveLength(1);
    });

    it('It should show an edit button when the application is on edit mode', async () => {
        const monograph = getMonographMock();
        render(<Page monograph={monograph} />);

        const button = screen.getByText('Edit');
        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.queryAllByRole('button')).toHaveLength(2);
        });
    });

    it('It should call the onClickHandler function when the card is clicked', async () => {
        const monograph = getMonographMock();
        monograph.name = 'My monograph';
        render(<Page monograph={monograph} />);

        const title = screen.getByText('My monograph');
        await userEvent.click(title);

        await waitFor(() => {
            expect(onClickHandler).toHaveBeenCalledTimes(1);
        });
    });

    it('It should call the onEditHandler function when edit button is clicked', async () => {
        const monograph = getMonographMock();
        monograph.name = 'My monograph';
        render(<Page monograph={monograph} />);

        const button = screen.getByText('Edit');
        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.queryAllByRole('button')).toHaveLength(2);
        });

        const editButton = screen.getAllByRole('button')[1];
        await userEvent.click(editButton);

        await waitFor(() => {
            expect(onEditHandler).toHaveBeenCalledTimes(1);
            expect(onClickHandler).toHaveBeenCalledTimes(1); // check that the event propagation is stopped
        });
    });
});
