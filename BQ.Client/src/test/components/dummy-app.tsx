import { PrimeReactProvider } from 'primereact/api';
import { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { ToastMessageServiceProvider } from '../../services/messages';
import { RouteDisplay } from './route-display';

interface DummyAppProps {
    children: ReactNode;
    path: string;
    routes: string[];
}

export const DummyApp: React.FC<DummyAppProps> = ({
    path,
    routes,
    children,
}) => {
    return (
        <MemoryRouter initialEntries={[path, ...routes]} initialIndex={0}>
            <PrimeReactProvider>
                <ToastMessageServiceProvider>
                    <Routes>
                        <Route path={path} key="path" element={children} />
                        {routes.map((r, i) => (
                            <Route
                                path={r}
                                key={`r-${i}`}
                                element={<RouteDisplay />}
                            />
                        ))}
                    </Routes>
                </ToastMessageServiceProvider>
            </PrimeReactProvider>
        </MemoryRouter>
    );
};
