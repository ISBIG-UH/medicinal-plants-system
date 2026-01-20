import { injectable } from 'inversify';
import axios, { AxiosError } from 'axios';
import { MessageService } from '../../../services/messages';
import {
    AccountConfirmation,
    LoginRequest,
    LoginResult,
} from '../types/authentication';
import { IUser } from '../../../types/user';
import {
    BaseHttpResponsesHandler,
    ErrorResponseData,
    HttpStatusCodes,
    IHttpResponseHandlerSettings,
} from '../../../services/http-interception';
import { BaseApiService } from '../../../services/api-service';

export interface IAccountService {
    login(
        login: LoginRequest,
        messageService: MessageService,
    ): Promise<LoginResult>;
    register(
        user: Partial<IUser>,
        messageService: MessageService,
    ): Promise<IUser>;
    confirm(
        accountConfirmation: Partial<AccountConfirmation>,
        messageService: MessageService,
    ): Promise<void>;
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
                    // this.channel.postMessage(authResult); //TODO: change this
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

    confirm(
        accountConfirmation: Partial<AccountConfirmation>,
        messageService: MessageService,
    ): Promise<void> {
        return this.handleRequest<void>(
            axios.post<void>(`${this.url}/confirm`, accountConfirmation),
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
        errorResponse: AxiosError<ErrorResponseData>,
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
