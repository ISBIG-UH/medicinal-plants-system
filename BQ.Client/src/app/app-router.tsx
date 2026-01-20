import { Route, Routes } from 'react-router';
import AppLayout from './app-layout';
import HomeComponent from '../features/home';
import TextSearchPage from './pages/text-search-page';
import IndexSearchPage from './pages/index-search-page';
import AppSearchPage from './pages/app-search-page';
import LoginPage from './pages/account/login-page';
import RegistrationPage from './pages/account/registration-page';
import ConfirmationPage from './pages/account/confirmation-page';
import NotFound from './pages/not-found';
import { ROUTES } from './routes';
import PlantFormPage from './pages/plants/plant-form-page';
import AboutPage from './pages/about-page';
import Users from '../features/users/components/users';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<TextSearchPage />} />
                <Route path={ROUTES.TEXT_SEARCH} element={<TextSearchPage />} />
                <Route
                    path={ROUTES.INDEX_SEARCH}
                    element={<IndexSearchPage />}
                />
                <Route path={ROUTES.USERS} element={<Users />} />
                <Route path={ROUTES.APP_SEARCH} element={<AppSearchPage />} />
                <Route path={ROUTES.PLANT_CREATE} element={<PlantFormPage />} />

                <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            </Route>

            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
            <Route path={ROUTES.CONFIRMATION} element={<ConfirmationPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
