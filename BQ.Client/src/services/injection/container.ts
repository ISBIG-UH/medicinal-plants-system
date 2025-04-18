import { Container } from 'inversify';
import { AppStore } from '../../stores/app-store';
import { AccountService } from '../../features/account/services/account-service';
import React from 'react';
import { TextSearchService } from '../../features/text-search/services/text-search-service';
import { IndexSearchService } from '../../features/index-search/services/index-search-service';
import { AppService } from '../../features/app-search/services/app-service';

const TYPES = {
    IAccountService: Symbol.for('IAccountService'),
    ITextSearchService: Symbol.for('ITextSearchService'),
    IIndexSearchService: Symbol.for('IndexSearchService'),
    IAppService: Symbol.for('IAppService'),
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
ServiceContainer.bind(TYPES.IAppService).to(AppService).inTransientScope();

export { TYPES, ServiceContainer };

export const ServiceContainerContext = React.createContext(ServiceContainer);
