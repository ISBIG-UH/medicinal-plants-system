import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter } from 'react-router';
import { ToastMessageServiceProvider } from '../features/messages';
import App from './app';
import { useCustomTailwindTheme } from '../hooks/use-custom-tailwind-theme';

const AppContainer: React.FC = () => {
    return (
        <BrowserRouter>
            <PrimeReactProvider
                value={{ unstyled: true, pt: useCustomTailwindTheme() }}
            >
                <ToastMessageServiceProvider>
                    <App />
                </ToastMessageServiceProvider>
            </PrimeReactProvider>
        </BrowserRouter>
    );
};

export default AppContainer;
