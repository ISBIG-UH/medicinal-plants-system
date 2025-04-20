import { Button } from 'primereact/button';
import React, { useContext } from 'react';
import {
    ServiceContainerContext,
    TYPES,
} from '../services/injection/container';
import { AppStore } from '../stores/app-store';
import { Link, useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

const AppTopbar: React.FC = React.memo(() => {
    const navigate = useNavigate();
    const ServiceContainer = useContext(ServiceContainerContext);
    const store = ServiceContainer.get<AppStore>(TYPES.IAppStore);

    const _Topbar = observer(() => (
        <div className="bg-primary flex py-2">
            <div className="w-3/4 flex-none pl-2 lg:pl-20">
                <div className="flex items-center gap-2">
                    <Button
                        rounded
                        aria-label="Toggle sidebar"
                        icon="pi pi-bars"
                        onClick={() =>
                            store.updateField('isMenuOpen', !store.isMenuOpen)
                        }
                    ></Button>
                    <Link
                        className="text-white font-bold text-4xl flex items-center space-x-1"
                        to="/"
                    >
                        <img
                            className="max-h-10 lg:max-h-12"
                            src="/1.png"
                            alt="BotaniQ Logo"
                        />
                        <p className="font-montserrat font-thin text-secondary">
                            BotaniQ
                        </p>
                    </Link>
                </div>
            </div>
            <div className="w-1/4 pr-2 lg:pr-28 items-center justify-end flex">
                <div className="flex h-100 items-center gap-1">
                    <label className="text-secondary hidden md:block">
                        {store.isLoggedIn
                            ? store.currentUser?.fullName
                            : 'Iniciar sesión'}
                    </label>
                    <Button
                        visible={!store.isLoggedIn}
                        aria-label="Login"
                        rounded
                        icon="pi pi-sign-in"
                        onClick={() => navigate('/account/login')}
                    />
                    <Button
                        visible={store.isLoggedIn}
                        aria-label="Logout"
                        rounded
                        icon="pi pi-sign-out"
                        onClick={() => navigate('/account/logout')}
                    />
                </div>
            </div>
        </div>
    ));

    return <_Topbar />;
});

export default AppTopbar;
