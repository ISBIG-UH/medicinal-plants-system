import { injectable } from 'inversify';
import axios from 'axios';
import { MessageService } from '../messages';
import { BaseApiService } from './base-api-service';
import { BaseHttpResponsesHandler } from '../http-interception';

export interface IPlantService {
    get(id: number, messageService: MessageService): Promise<Monograph>;
}

@injectable()
export class PlantService extends BaseApiService implements IPlantService {
    url: string = 'api/monograph';

    get(id: number, messageService: MessageService): Promise<Monograph> {
        return this.handleRequest(
            axios.get<Monograph>(`${this.url}/${id}`),
            new BaseHttpResponsesHandler(messageService),
        );
    }
}
