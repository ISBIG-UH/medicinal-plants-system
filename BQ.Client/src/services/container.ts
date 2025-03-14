import { Container } from "inversify";
import { AppStore } from "../layout/AppStore";
import { AccountService, IAccountService } from "../features/account/AccountService";



const ServiceContainer = new Container();

ServiceContainer.bind(AppStore).toSelf().inSingletonScope();
ServiceContainer.bind(IAccountService).to(AccountService).inTransientScope();

export {ServiceContainer}