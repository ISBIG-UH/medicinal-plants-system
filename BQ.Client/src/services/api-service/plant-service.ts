import { injectable } from 'inversify';
import axios from 'axios';
import { MessageService } from '../messages';
import { BaseApiService } from './base-api-service';
import { BaseHttpResponsesHandler } from '../http-interception';

export interface IPlantService {
    get(id: number, messageService: MessageService): Promise<Monograph>;
    update(
        plant: Monograph,
        messageService: MessageService,
    ): Promise<Monograph>;
    create(
        plant: Monograph,
        messageService: MessageService,
    ): Promise<Monograph>;
    delete(id: number, messageService: MessageService): Promise<void>;
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

    update(
        plant: Monograph,
        messageService: MessageService,
    ): Promise<Monograph> {
        return this.handleRequest(
            axios.put<Monograph>(this.url, plant),
            new BaseHttpResponsesHandler(messageService),
        );
    }

    create(
        plant: Monograph,
        messageService: MessageService,
    ): Promise<Monograph> {
        return this.handleRequest(
            axios.post<Monograph>(this.url, plant),
            new BaseHttpResponsesHandler(messageService),
        );
    }

    delete(id: number, messageService: MessageService): Promise<void> {
        return this.handleRequest(
            axios.delete<void>(`${this.url}/${id}`),
            new BaseHttpResponsesHandler(messageService),
        );
    }
}
