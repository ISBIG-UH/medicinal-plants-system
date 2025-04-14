import { injectable } from 'inversify';
import axios, { AxiosError } from 'axios';
import {
    BaseHttpResponsesHandler,
    IHttpResponseHandlerSettings,
} from '../../../services/http/http-responses-handler';
import { MessageService } from '../../messages';
import { HttpStatusCodes } from '../../../services/http/http-status-codes';
import { BroadcastChannel } from 'broadcast-channel';
import { LoginRequest, LoginResult } from '../types/authentication';
import { BaseApiService } from '../../../services/interfaces/base-api-service';
import { IUser } from '../types/user';

export interface IAccountService {
    login(
        login: LoginRequest,
        messageService: MessageService,
    ): Promise<LoginResult>;
    register(
        user: Partial<IUser>,
        messageService: MessageService,
    ): Promise<IUser>;
}

@injectable()
export class AccountService extends BaseApiService implements IAccountService {
    url: string = 'api/account';

    channel = new BroadcastChannel('botaniq_account_channel');
    loginPromise: Promise<LoginResult> | null = null;

    login(
        login: LoginRequest,
        messageService: MessageService,
    ): Promise<LoginResult> {
        // avoids creating multiple login requests by mistake leading to the server blocking the user
        if (this.loginPromise == null) {
            this.loginPromise = this.handleRequest<LoginResult>(
                axios.post<LoginResult>(`${this.url}/login`, login),
                new LoginResponsesHandler(messageService),
            )
                .then((authResult) => {
                    this.loginPromise = null;
                    this.channel.postMessage(authResult);
                    return authResult;
                })
                .catch((authError) => {
                    this.loginPromise = null;
                    throw authError;
                });
        }

        return this.loginPromise;
    }

    register(
        user: Partial<IUser>,
        messageService: MessageService,
    ): Promise<IUser> {
        return this.handleRequest<IUser>(
            axios.post<IUser>(`${this.url}/register`, user),
            new BaseHttpResponsesHandler(messageService),
        );
    }
}

export class LoginResponsesHandler extends BaseHttpResponsesHandler {
    constructor(
        protected messageService: MessageService,
        settings?: IHttpResponseHandlerSettings,
    ) {
        super(messageService, settings);
    }

    protected override handleErrorHttpStatusCode(
        errorResponse: AxiosError,
    ): void {
        if (
            errorResponse.response?.status == HttpStatusCodes.Status403Forbidden
        ) {
            this.messageService.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor, compruebe que sus credenciales sean correctas.',
            });
            return;
        }

        super.handleErrorHttpStatusCode(errorResponse);
    }
}
