import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { server } from './mocks/api/server';
import axios from 'axios';

beforeAll(() => {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;
    server.listen();

    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,

            // legacy listeners (for some libs)
            addListener: () => {},
            removeListener: () => {},

            // standard events
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });
});

afterEach(() => server.resetHandlers());

afterEach(() => {
    cleanup();
});

afterAll(() => server.close());
