import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter } from 'react-router';
import App from './app';
import { usePassThrough } from 'primereact/passthrough';
import Tailwind from 'primereact/passthrough/tailwind';
import { tailwindTheme } from '../theme';
import { twMerge } from 'tailwind-merge';
import { ToastMessageServiceProvider } from '../services/messages';

const AppContainer: React.FC = () => {
    const customTailwind = usePassThrough(Tailwind, tailwindTheme, {
        mergeSections: true,
        mergeProps: true,
        classNameMergeFunction: twMerge,
    });

    return (
        <BrowserRouter>
            <PrimeReactProvider value={{ unstyled: true, pt: customTailwind }}>
                <ToastMessageServiceProvider>
                    <App />
                </ToastMessageServiceProvider>
            </PrimeReactProvider>
        </BrowserRouter>
    );
};

export default AppContainer;
