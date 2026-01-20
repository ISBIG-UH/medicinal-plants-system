// src/mocks/node.js
import { setupServer } from 'msw/node';
import { handlers } from './account';

export const server = setupServer(...handlers);
