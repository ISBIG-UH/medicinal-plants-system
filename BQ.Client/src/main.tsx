import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './fonts.css';

import axios from 'axios';
import AppContainer from './app/app-container.tsx';

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppContainer />
    </StrictMode>,
);
