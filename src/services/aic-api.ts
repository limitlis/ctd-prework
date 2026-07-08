import xior from 'xior';

export const api = xior.create({
    baseURL: 'https://api.artic.edu/api/v1/',
    headers: {
        'AIC-User-Agent': 'coding-assignment (cesar@limitlis.com)',
    },
});
