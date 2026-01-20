import { injectable } from 'inversify';
import axios from 'axios';
import { MessageService } from '../../../services/messages';
import { BaseHttpResponsesHandler } from '../../../services/http-interception';
import { BaseApiService } from '../../../services/api-service';

export interface IIndexSearchService {
    search(
        letter: string,
        messageService: MessageService,
    ): Promise<Monograph[]>;
}

@injectable()
export class IndexSearchService
    extends BaseApiService
    implements IIndexSearchService
{
    url: string = 'api/index';

    search(
        letter: string,
        messageService: MessageService,
    ): Promise<Monograph[]> {
        return this.handleRequest(
            axios.get<Monograph[]>(`${this.url}/${letter}`),
            new BaseHttpResponsesHandler(messageService),
        );
    }
}
