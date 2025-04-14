import { Container } from 'inversify';
import {
    AccountService,
    IAccountService,
} from '../features/account/services/account-service';
import { AppStore } from '../stores/app-store';

const TYPES = {
    IAccountService: Symbol.for('IParser'),
};

const ServiceContainer = new Container();

ServiceContainer.bind(AppStore).toSelf().inSingletonScope();
ServiceContainer.bind(TYPES.IAccountService)
    .to(AccountService)
    .inTransientScope();

export { TYPES, ServiceContainer };
