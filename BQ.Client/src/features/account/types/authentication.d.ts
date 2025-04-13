export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResult {
    userId: string;
    loggedUser: IUser;
    sessionToken: string;
}
