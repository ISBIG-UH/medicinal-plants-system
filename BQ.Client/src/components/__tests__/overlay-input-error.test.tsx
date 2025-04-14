import { InputText } from 'primereact/inputtext';
import { describe, expect, it } from 'vitest';
import OverlayInputError from '../overlay-input-error';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('Overlay Input Error Component', () => {
    const page = () => (
        <div>
            <OverlayInputError error={"This is the input's error"}>
                <InputText
                    id="email"
                    type="text"
                    className="w-full email"
                    invalid={true}
                    value={'This is the input'}
                />
            </OverlayInputError>
        </div>
    );

    it('Should appear when the mouse enters the input and diseappear when it leaves', async () => {
        render(page());

        // check: the input is rendered
        screen.getByDisplayValue('This is the input');

        // check: the input is wrapped
        const inputWrapper = screen.getByTestId('overlay-input-error-wrapper');

        // check: the error should not be displayed by default
        expect(
            screen.queryByText("This is the input's error"),
        ).not.toBeInTheDocument();

        // check: the overlay error appears when the mouse enters
        fireEvent.mouseEnter(inputWrapper);
        expect(
            screen.queryByText("This is the input's error"),
        ).toBeInTheDocument();

        // check: the overlay error dissapears when the mouse leaves
        fireEvent.mouseLeave(inputWrapper);
        await waitFor(() => {
            expect(
                screen.queryByText("This is the input's error"),
            ).not.toBeInTheDocument();
        });
    });
});
