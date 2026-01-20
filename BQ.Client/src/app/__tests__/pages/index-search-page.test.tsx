import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { DummyApp } from '../../../test';
import IndexSearchPage from '../../pages/index-search-page';

describe('Index Search Page', () => {
    const Page: React.FC = () => {
        return (
            <DummyApp path="/search/index" routes={['/']}>
                <IndexSearchPage />
            </DummyApp>
        );
    };

    it('It should render without errors', () => {
        render(<Page />);
    });
});
