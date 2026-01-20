import { injectable } from 'inversify';
import axios, { AxiosError } from 'axios';
import { MessageService } from '../../../services/messages';
import { BroadcastChannel } from 'broadcast-channel';
import {
    BaseHttpResponsesHandler,
    ErrorResponseData,
    HttpStatusCodes,
    IHttpResponseHandlerSettings,
} from '../../../services/http-interception';
import { BaseApiService } from '../../../services/api-service';

export interface ITextSearchService {
    search(query: string, messageService: MessageService): Promise<Monograph[]>;
}

@injectable()
export class TextSearchService
    extends BaseApiService
    implements ITextSearchService
{
    url: string = 'api/search';

    search(
        query: string,
        messageService: MessageService,
    ): Promise<Monograph[]> {
        return this.handleRequest(
            axios.get<Monograph[]>(`${this.url}/plants`, {
                params: { query: query },
            }),
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
