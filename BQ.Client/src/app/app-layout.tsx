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
                            'bg-gray-200 flex-auto transition-all duration-500 ease-in-out',
                            {
                                'max-w-0': !store.variables.isMenuOpen,
                                'max-w-full md:max-w-80 md:min-w-80':
                                    store.variables.isMenuOpen,
                            },
                        )}
                    >
                        <div
                            className={classNames('w-full h-full', {
                                block: store.variables.isMenuOpen,
                                hidden: !store.variables.isMenuOpen,
                            })}
                        >
                            <AppSideBar />
                        </div>
                    </div>
                    <div
                        className={classNames(
                            'flex-auto transition-all duration-500 ease-in-out',
                            {
                                'max-w-full lg:px-[12%]':
                                    !store.variables.isMenuOpen,
                                'max-w-0 md:max-w-full':
                                    store.variables.isMenuOpen,
                            },
                        )}
                    >
                        <div
                            className={classNames('w-full h-full', {
                                block: !store.variables.isMenuOpen,
                                'hidden md:block': store.variables.isMenuOpen,
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
