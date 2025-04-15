export interface AccountConfirmation {
    userId: string;
    token: string;
    password: string;
    passwordConfirmation: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResult {
    userId: string;
    loggedUser: IUser;
    sessionToken: string;
}
