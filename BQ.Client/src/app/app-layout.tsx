import { Outlet } from 'react-router';
import AppSideBar from './app-sidebar';
import AppTopbar from './app-topbar';
import { classNames } from 'primereact/utils';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import {
    ServiceContainerContext,
    TYPES,
} from '../services/injection/container';
import { AppStore } from '../stores/app-store';

const AppLayout: React.FC = () => {
    const ServiceContainer = useContext(ServiceContainerContext);
    const store = ServiceContainer.get<AppStore>(TYPES.IAppStore);

    const _AppLayout = observer(() => {
        return (
            <div className="flex flex-col h-screen">
                <AppTopbar />
                <div className="flex flex-row flex-grow h-full overflow-x-auto overflow-y-hidden w-full">
                    <div
                        className={classNames(
                            'bg-gray-200 flex-auto transition-all duration-500 ease-in-out',
                            {
                                'max-w-0': !store.isMenuOpen,
                                'max-w-full md:max-w-80 md:min-w-80':
                                    store.isMenuOpen,
                            },
                        )}
                    >
                        <div className="w-full h-full">
                            {store.isMenuOpen && <AppSideBar />}
                        </div>
                    </div>
                    <div
                        className={classNames(
                            'flex-auto transition-all duration-500 ease-in-out',
                            {
                                'max-w-full': !store.isMenuOpen,
                                'max-w-0 md:max-w-full': store.isMenuOpen,
                            },
                        )}
                    >
                        <div
                            className={classNames('w-full h-full', {
                                block: !store.isMenuOpen,
                                'hidden md:block': store.isMenuOpen,
                            })}
                        >
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return <_AppLayout />;
};

export default AppLayout;
