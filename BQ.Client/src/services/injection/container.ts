import { Container } from 'inversify';
import { AppStore } from '../../stores/app-store';
import { AccountService } from '../../features/account/services/account-service';
import React from 'react';
import { TextSearchService } from '../../features/text-search/services/text-search-service';

const TYPES = {
    IAccountService: Symbol.for('IAccountService'),
    ITextSearchService: Symbol.for('ITextSearchService'),
};

const ServiceContainer = new Container();

ServiceContainer.bind(AppStore).toSelf().inSingletonScope();
ServiceContainer.bind(TYPES.IAccountService)
    .to(AccountService)
    .inTransientScope();
ServiceContainer.bind(TYPES.ITextSearchService)
    .to(TextSearchService)
    .inTransientScope();

export { TYPES, ServiceContainer };

export const ServiceContainerContext = React.createContext(ServiceContainer);
