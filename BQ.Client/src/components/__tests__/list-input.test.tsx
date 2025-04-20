import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import ArrayInput from '../../components/list-input';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DummyApp } from '../../test';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const schema = Yup.object({
    array: Yup.array().length(2),
});

const onSubmitMock = vi.fn((data) => data.array);

const TestPage: React.FC<{ array: string[] }> = ({ array }) => {
    const { control, register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            array: array,
        },
    });

    return (
        <DummyApp path="/" routes={[]}>
            <form onSubmit={handleSubmit(onSubmitMock)}>
                <ArrayInput
                    name="array"
                    control={control}
                    register={register}
                    placeholder={'Input'}
                ></ArrayInput>
                <Button label="Submit" type="submit"></Button>
            </form>
        </DummyApp>
    );
};

describe('Divider component', () => {
    it('It should render the empty component when the default list is empty', () => {
        render(<TestPage array={[]} />);

        expect(
            screen.queryByText('No se añadirán elementos'),
        ).toBeInTheDocument();
        expect(
            screen.queryByLabelText('Add element to array'),
        ).toBeInTheDocument();
        expect(
            screen.queryByLabelText('Remove element from array'),
        ).not.toBeInTheDocument();
    });

    it('It should render an input for each element of the initial list', () => {
        render(<TestPage array={['foo', 'bar']} />);

        expect(
            screen.queryByLabelText('Add element to array'),
        ).toBeInTheDocument();
        expect(screen.queryAllByRole('textbox')).toHaveLength(2);
        expect(screen.queryByDisplayValue('foo')).toBeInTheDocument();
        expect(screen.queryByDisplayValue('bar')).toBeInTheDocument();
        expect(
            screen.queryAllByLabelText('Remove element from array'),
        ).toHaveLength(2);
    });

    it('It should allow the user to modify the list and pass the value to the form', async () => {
        render(<TestPage array={['foo', 'bar']} />);

        const addButton = screen.getByLabelText('Add element to array');
        const deleteButton = screen.getAllByLabelText(
            'Remove element from array',
        )[1];

        await userEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.queryByDisplayValue('bar')).not.toBeInTheDocument();
        });

        await userEvent.click(addButton);

        await waitFor(() => {
            expect(
                screen.queryByPlaceholderText('Input 2'),
            ).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText('Input 2');
        await userEvent.type(input, 'waldo');

        const submit = screen.getByText('Submit');
        await userEvent.click(submit);

        await waitFor(() => {
            expect(onSubmitMock).toHaveBeenCalledTimes(1);
        });

        const lastResult = onSubmitMock.mock.results[0].value;
        expect(lastResult).toStrictEqual(['foo', 'waldo']);
    });
});
