import Axios from 'axios';

import xsrfToken from './xsrfToken';

const api = Axios.create({
    baseURL: window.location.origin + '/api',
    headers: {
        'Content-type': 'application/json',
        'Content-Type': 'multipart/form-data',
        common: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        ...(Object.keys(xsrfToken()).some((xrfs) => xrfs === 'token') && {
            Authorization: xsrfToken().token,
        }),
    },
});

export default api;
