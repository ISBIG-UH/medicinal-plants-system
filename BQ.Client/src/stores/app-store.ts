import { makeAutoObservable } from 'mobx';
import { IUser } from '../features/account/types/user';
import { ServiceContainer } from '../services/injection/container';

export class AppStore {
    currentUser: IUser | null = null;
    isMenuOpen: boolean = true;
    isLoggedIn: boolean = false;
    isEditMode: boolean = true;
    accountChannel = new BroadcastChannel('botaniq_account_channel');

    constructor() {
        makeAutoObservable(this, {
            accountChannel: false,
        });
        this.accountChannel.onmessage = this.onMessageHandler;
    }

    updateField(key: keyof AppStore, value: any) {
        this[key] = value;
    }

    onMessageHandler(event: any) {
        const store = ServiceContainer.get(AppStore);

        store.updateField('isLoggedIn', true);
        store.updateField('currentUser', event.data.data.loggedUser);
        // this.variables.isLoggedIn = true;
        // this.variables.currentUser = authMessage.loggedUser;
    }
}
