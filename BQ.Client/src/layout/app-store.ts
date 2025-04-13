import { makeAutoObservable, toJS } from "mobx";
import { Container } from "inversify";
import { ServiceContainer } from "../services/container";
import { SortOrder } from "primereact/api";
import { IUser } from "../features/account/types/user";

export interface AppVariables {
    isMenuOpen: boolean;
    isLoggedIn: boolean;
    currentUser: IUser;
}

export class AppStore {

    variables: Partial<AppVariables> = { isMenuOpen: true, isLoggedIn: false};
    accountChannel = new BroadcastChannel("botaniq_account_channel");


    constructor() {
        makeAutoObservable(this, {
            accountChannel: false
        });
        this.variables = { isMenuOpen: true, isLoggedIn: false};
        this.accountChannel.onmessage = this.onMessageHandler;
        console.log('new App Store');
    }

    updateField (key: keyof AppVariables, value: any) {
        this.variables[key] = value;
    }

    onMessageHandler(event: any) {
        const store = ServiceContainer.get(AppStore);

        console.log("hello there");
        store.updateField('isLoggedIn', true);
        store.updateField('currentUser', event.data.data.loggedUser);
        // this.variables.isLoggedIn = true;
        // this.variables.currentUser = authMessage.loggedUser;
    }

}