import { Route, Routes } from 'react-router-dom';
import { spy } from 'mobx';
import HomeComponent from '../features/home';
import AppLayout from './app-layout';
import NotFound from './pages/not-found';
import LoginPage from './pages/account/login';
import RegistrationPage from './pages/account/registration';
import ConfirmationPage from './pages/account/confirmation';
import { TextSearchBox } from '../features/text-search';
import TextSearchPage from './pages/text-search-page';

function App() {
    // TODO: make this development environment only
    spy((event) => {
        if (event.type === 'reaction') {
            console.log('MobX Reaction:', event);
        }
    });

    return (
        <>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<HomeComponent />} />
                    <Route path="/search" element={<TextSearchPage />} />
                </Route>

                <Route path="/account/login" element={<LoginPage />} />
                <Route
                    path="/account/registration"
                    element={<RegistrationPage />}
                />
                <Route
                    path="/account/confirmation"
                    element={<ConfirmationPage />}
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
