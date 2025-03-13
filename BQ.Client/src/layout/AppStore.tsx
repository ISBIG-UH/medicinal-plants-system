import { makeAutoObservable, toJS } from "mobx";

export interface AppVariables {
    isMenuOpen: boolean;
}

export class AppStore {

    variables: Partial<AppVariables> = { isMenuOpen: true };


    constructor() {
        makeAutoObservable(this);
        console.log('new App Store');
    }

    updateField (key: keyof AppVariables, value: any) {
        this.variables[key] = value;
    }

}