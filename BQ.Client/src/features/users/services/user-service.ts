import { injectable } from 'inversify';
import axios, { AxiosError } from 'axios';
import { MessageService } from '../../../services/messages';
import {
    BaseHttpResponsesHandler,
    ErrorResponseData,
    HttpStatusCodes,
    IHttpResponseHandlerSettings,
} from '../../../services/http-interception';
import {
    BaseApiService,
    constructHttpParams,
} from '../../../services/api-service';
import { IUser } from '../../../types/user';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import qs from 'qs';

export interface IUserService {
    getPage(
        queryCommand: QueryCommand,
        messageService: MessageService,
    ): Promise<PageResult<IUser>>;
}

@injectable()
export class UserService extends BaseApiService implements IUserService {
    url: string = 'api/user';

    getPage(
        queryCommand: QueryCommand,
        messageService: MessageService,
    ): Promise<PageResult<IUser>> {
        const params = constructHttpParams(queryCommand);

        return this.handleRequest<PageResult<IUser>>(
            axios.get<PageResult<IUser>>(`${this.url}/page`, {
                params: params,
                paramsSerializer: {
                    serialize: (params) => {
                        return qs.stringify(params);
                    },
                },
            }),
        );
    }
}
