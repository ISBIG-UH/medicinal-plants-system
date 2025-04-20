import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { DummyApp } from '../../../test';
import TextSearchPage from '../../pages/text-search-page';

describe('Text Search Page', () => {
    const Page: React.FC = () => {
        return (
            <DummyApp path="/search/text" routes={['/']}>
                <TextSearchPage />
            </DummyApp>
        );
    };

    it('It should render without errors', () => {
        render(<Page />);
    });
});
