import { http, HttpResponse } from 'msw';
import { getMonographMock } from '../plants';

const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const handlers = [
    http.post(`${baseUrl}/api/account/login`, async () => {
        return HttpResponse.json({
            userId: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
            loggedUser: {},
            sessionToken: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
        });
    }),

    http.post(`${baseUrl}/api/account/register`, async () => {
        return HttpResponse.json({});
    }),

    http.post(`${baseUrl}/api/account/confirm`, async () => {
        return HttpResponse.json({});
    }),

    http.get(`${baseUrl}/api/search/plants?query=ajo`, async ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('query');

        if (query === 'ajo') {
            const monographs = Array.from({ length: 3 }, (_v, k) => {
                const monograph = getMonographMock();
                monograph.name = `name_${k}`;
                return monograph;
            });
            return HttpResponse.json(monographs);
        }

        return HttpResponse.json([]);
    }),

    http.get(`${baseUrl}/api/index/A`, async ({ request }) => {
        const monographs = Array.from({ length: 3 }, (_v, k) => {
            const monograph = getMonographMock();
            monograph.name = `name_${k}`;
            return monograph;
        });
        return HttpResponse.json(monographs);
    }),

    http.get(`${baseUrl}/api/index/B`, async ({ request }) => {
        const monographs = Array.from({ length: 3 }, (_v, k) => {
            const monograph = getMonographMock();
            monograph.name = `name_${k}`;
            return monograph;
        });
        return HttpResponse.json(monographs);
    }),

    http.get(`${baseUrl}/api/index/C`, async ({ request }) => {
        return HttpResponse.json([]);
    }),
];
