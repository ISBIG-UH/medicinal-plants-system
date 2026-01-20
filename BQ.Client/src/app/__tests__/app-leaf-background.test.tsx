import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { DummyApp } from '../../test';
import LeafBackground from '../app-leaf-background';

describe('App Layout component', () => {
    const Page: React.FC = () => {
        return (
            <DummyApp path="/test" routes={['/']}>
                <LeafBackground>
                    <div>Page content</div>
                </LeafBackground>
            </DummyApp>
        );
    };

    it('It should render the go home button and the content', () => {
        render(<Page />);

        expect(screen.queryByLabelText('Go to home')).toBeInTheDocument();
        expect(screen.queryByText('Page content')).toBeInTheDocument();
    });

    it("The go to home button should route to home ('/') ", async () => {
        render(<Page />);

        const button = screen.getByLabelText('Go to home');
        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByText('/')).toBeInTheDocument();
        });
    });
});
