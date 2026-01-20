import { injectable } from 'inversify';
import axios from 'axios';
import { MessageService } from '../../../services/messages';
import { BaseHttpResponsesHandler } from '../../../services/http-interception';
import { BaseApiService } from '../../../services/api-service';

export interface IAppService {
    getAll(messageService: MessageService): Promise<AppItem[]>;
    get(id: number, messageService: MessageService): Promise<App>;
}

@injectable()
export class AppService extends BaseApiService implements IAppService {
    url: string = 'api/app';

    getAll(messageService: MessageService): Promise<AppItem[]> {
        return this.handleRequest(
            axios.get<AppItem[]>(`${this.url}`),
            new BaseHttpResponsesHandler(messageService),
        );
    }

    get(id: number, messageService: MessageService): Promise<App> {
        return this.handleRequest(
            axios.get<App>(`${this.url}/${id}`),
            new BaseHttpResponsesHandler(messageService),
        );
    }
}
