import { injectable } from "inversify";
import { AuthRequest, AuthResult } from "../types/authentication";
import axios, { AxiosError } from "axios";
import { BaseApiService } from "../../../services/interfaces/BaseApiService";
import { BaseHttpResponsesHandler, IHttpResponseHandlerSettings } from "../../../services/http/http-responses-handler";
import { MessageService } from "../../messages";
import { HttpStatusCodes } from "../../../services/http/http-status-codes";
import { BroadcastChannel } from 'broadcast-channel';


@injectable()
export class IAccountService extends BaseApiService {

    login(login: AuthRequest, messageService: MessageService): Promise<AuthResult> {
        throw new Error("Not implemented exception");
    };
    
}

export class AccountService extends IAccountService {
    url: string = "api/account";

    channel = new BroadcastChannel("botaniq_account_channel");
    loginPromise: Promise<AuthResult> | null = null;

    login(login: AuthRequest, messageService: MessageService): Promise<AuthResult> {

        // avoids creating multiple login requests by mistake leading to the server blocking the user 
        if (this.loginPromise == null) 
        {
            this.loginPromise = this.handleRequest<AuthResult>(
                axios.post<AuthResult>(`${this.url}/login`, login),
                new LoginResponsesHandler(messageService)
            ).then((authResult) => {
                this.loginPromise = null;
                this.channel.postMessage(authResult);
                return authResult;
            }).catch((authError) => {
                this.loginPromise = null;
                throw authError;
            });
        }

        return this.loginPromise;
        
    }
}


export class LoginResponsesHandler extends BaseHttpResponsesHandler {
    constructor(protected messageService: MessageService,  settings?: IHttpResponseHandlerSettings) {
        super(messageService, settings);
    }

    protected override handleErrorHttpStatusCode(errorResponse: AxiosError): void {

        if (errorResponse.response?.status == HttpStatusCodes.Status403Forbidden) {
            this.messageService.show(
                {
                    severity: 'error', 
                    summary: 'Error', 
                    detail: 'Por favor, compruebe que sus credenciales sean correctas.'
                });
            return;
        }

        super.handleErrorHttpStatusCode(errorResponse);
    }
}

