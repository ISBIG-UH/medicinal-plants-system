import { Container } from 'inversify';
import { AppStore } from '../../stores/app-store';
import { AccountService } from '../../features/account/services/account-service';
import React from 'react';

const TYPES = {
    IAccountService: Symbol.for('IParser'),
};

const ServiceContainer = new Container();

ServiceContainer.bind(AppStore).toSelf().inSingletonScope();
ServiceContainer.bind(TYPES.IAccountService)
    .to(AccountService)
    .inTransientScope();

export { TYPES, ServiceContainer };

export const ServiceContainerContext = React.createContext(ServiceContainer);
