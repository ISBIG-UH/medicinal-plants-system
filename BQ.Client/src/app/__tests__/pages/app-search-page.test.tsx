import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { DummyApp } from '../../../test';
import AppSearchPage from '../../pages/app-search-page';

describe('App Search Page', () => {
    const Page: React.FC = () => {
        return (
            <DummyApp path="/search/app" routes={['/']}>
                <AppSearchPage />
            </DummyApp>
        );
    };

    it('It should render without errors', () => {
        render(<Page />);
    });
});
