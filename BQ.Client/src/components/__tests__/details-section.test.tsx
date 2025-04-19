import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PiPlantBold } from 'react-icons/pi';
import DetailsSection from '../details-section';

describe('Details Section component', () => {
    const page = () => (
        <DetailsSection
            icon={<PiPlantBold fontSize={20} />}
            name={'My section'}
        >
            <p>Section content</p>
        </DetailsSection>
    );

    it('It should render correctly', () => {
        const app = render(page());
        expect(app.container.querySelector('svg')).not.toBeNull();
        expect(screen.getByText('My section')).toBeInTheDocument();
        expect(screen.getByText('Section content')).toBeInTheDocument();
    });
});
