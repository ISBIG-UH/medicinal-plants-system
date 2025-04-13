import { AxiosError, AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import { IHttpResponsesHandler } from '../http/http-responses-handler';

/**
 * Provides basic functionality to handle an asynchronous request to a server
 */
@injectable()
export abstract class BaseApiService {
    readonly url: string = '';

    protected handleRequest<TResult>(
        request: Promise<AxiosResponse<TResult, any>>,
        responseHandler?: IHttpResponsesHandler,
    ): Promise<TResult> {
        if (responseHandler) {
            return request
                .then((x: AxiosResponse<TResult, any>) => {
                    if (responseHandler.handleSuccess) {
                        responseHandler.handleSuccess();
                    }
                    return Promise.resolve(x.data);
                })
                .catch((errorResponse: AxiosError) => {
                    if (responseHandler.handleError) {
                        responseHandler.handleError(errorResponse);
                    }
                    return Promise.reject(errorResponse);
                });
        } else {
            return request.then((x) => x.data);
        }
    }
}
