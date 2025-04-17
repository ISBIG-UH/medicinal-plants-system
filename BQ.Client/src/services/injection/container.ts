import { Container } from 'inversify';
import { AppStore } from '../../stores/app-store';
import { AccountService } from '../../features/account/services/account-service';
import React from 'react';
import { TextSearchService } from '../../features/text-search/services/text-search-service';
import { IndexSearchService } from '../../features/index-search/services/index-search-service';

const TYPES = {
    IAccountService: Symbol.for('IAccountService'),
    ITextSearchService: Symbol.for('ITextSearchService'),
    IIndexSearchService: Symbol.for('IndexSearchService'),
};

const ServiceContainer = new Container();

ServiceContainer.bind(AppStore).toSelf().inSingletonScope();
ServiceContainer.bind(TYPES.IAccountService)
    .to(AccountService)
    .inTransientScope();
ServiceContainer.bind(TYPES.ITextSearchService)
    .to(TextSearchService)
    .inTransientScope();
ServiceContainer.bind(TYPES.IIndexSearchService)
    .to(IndexSearchService)
    .inTransientScope();

export { TYPES, ServiceContainer };

export const ServiceContainerContext = React.createContext(ServiceContainer);
