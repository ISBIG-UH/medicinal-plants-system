import { Container } from "inversify";
import { AppStore } from "../layout/app-store";
import { AccountService, IAccountService } from "../features/account/services/account-service";

const TYPES = {
    IAccountService: Symbol.for("IParser"),
}

const ServiceContainer = new Container();

ServiceContainer.bind(AppStore).toSelf().inSingletonScope();
ServiceContainer.bind(TYPES.IAccountService).to(AccountService).inTransientScope();

export {TYPES, ServiceContainer}