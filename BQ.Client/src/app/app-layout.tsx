import { Outlet } from 'react-router';
import AppSideBar from './app-sidebar';
import AppTopbar from './app-topbar';
import { AppStore } from '../stores/app-store';
import { ServiceContainer } from '../services/container';
import { classNames } from 'primereact/utils';
import { observer } from 'mobx-react-lite';

const AppLayout: React.FC = () => {
    const store: AppStore = ServiceContainer.get(AppStore);
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
                            'flex-auto transition-all duration-500 ease-in-out',
                            {
                                'max-w-0': store.variables.isMenuOpen,
                                'max-w-full': !store.variables.isMenuOpen,
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
