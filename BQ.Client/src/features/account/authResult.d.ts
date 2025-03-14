import { IUser } from "./user";

export interface AuthResult {
    userId: string;
    loggedUser: IUser;
    sessionToken: string;
}