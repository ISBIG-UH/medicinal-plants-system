import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Divider from '../divider';
import { PiPlantBold } from 'react-icons/pi';

describe('Divider component', () => {
    const page = () => (
        <Divider>
            <PiPlantBold fontSize={20} />
        </Divider>
    );

    it('It should render the children prop', () => {
        const app = render(page());
        expect(app.container.querySelector('svg')).not.toBeNull();
    });
});
