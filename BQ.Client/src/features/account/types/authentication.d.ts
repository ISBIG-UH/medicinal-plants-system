import { IUser } from "./user";

export interface AuthRequest {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface AuthResult {
    userId: string;
    loggedUser: IUser;
    sessionToken: string;
}