import { Outlet } from 'react-router';
import AppSideBar from './app-sidebar';
import AppTopbar from './app-topbar';
import { classNames } from 'primereact/utils';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { ServiceContainerContext } from '../services/injection/container';
import { AppStore } from '../stores/app-store';

const AppLayout: React.FC = () => {
    const ServiceContainer = useContext(ServiceContainerContext);
    const store = ServiceContainer.get(AppStore);

    const _AppLayout = observer(() => {
        return (
            <div className="flex flex-col h-screen">
                <AppTopbar />
                <div className="flex flex-row flex-grow h-full overflow-x-hidden overflow-y-auto lg:overflow-y-hidden w-full">
                    <div
                        className={classNames(
                            'flex-auto md:max-w-64 transition-all duration-500 ease-in-out',
                            {
                                'max-w-0': !store.variables.isMenuOpen,
                                'max-w-full': store.variables.isMenuOpen,
                            },
                        )}
                    >
                        <AppSideBar />
                    </div>
                    <div
                        className={classNames(
                            'flex-auto md:max-w-full transition-all duration-500 ease-in-out',
                            {
                                'sm:max-w-0': store.variables.isMenuOpen,
                                'sm:max-w-full': !store.variables.isMenuOpen,
                            },
                        )}
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    });

    return <_AppLayout />;
};

export default AppLayout;
