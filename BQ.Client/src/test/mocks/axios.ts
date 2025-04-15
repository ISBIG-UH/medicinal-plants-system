import { AxiosError } from 'axios';
import { ErrorResponseData } from '../../services/http-interception';

export const mockAxiosError: (
    code: string,
    dataMessage?: string,
) => AxiosError<ErrorResponseData> = (code: string, dataMessage?: string) => {
    return {
        isAxiosError: true,
        name: 'Fake AxiosError',
        message: 'Fake AxiosError message',
        config: {},
        code: code,
        request: {},
        response: {
            data: dataMessage ? { message: dataMessage } : null,
        },
        toJSON: () => ({}),
    } as AxiosError<ErrorResponseData>;
};
