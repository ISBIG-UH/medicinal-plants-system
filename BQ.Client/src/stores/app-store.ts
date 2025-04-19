import { makeAutoObservable } from 'mobx';
import { IUser } from '../features/account/types/user';
import { ServiceContainer } from '../services/injection/container';

export interface AppVariables {
    isMenuOpen: boolean;
    isLoggedIn: boolean;
    currentUser: IUser;
    isEditMode: boolean;
}

export class AppStore {
    variables: Partial<AppVariables> = { isMenuOpen: true, isLoggedIn: false };
    accountChannel = new BroadcastChannel('botaniq_account_channel');

    constructor() {
        makeAutoObservable(this, {
            accountChannel: false,
        });
        this.variables = {
            isMenuOpen: true,
            isLoggedIn: false,
            isEditMode: false,
        };
        this.accountChannel.onmessage = this.onMessageHandler;
    }

    updateField(key: keyof AppVariables, value: any) {
        this.variables[key] = value;
    }

    onMessageHandler(event: any) {
        const store = ServiceContainer.get(AppStore);

        store.updateField('isLoggedIn', true);
        store.updateField('currentUser', event.data.data.loggedUser);
        // this.variables.isLoggedIn = true;
        // this.variables.currentUser = authMessage.loggedUser;
    }
}
