import i18next from 'i18next';

import { typeIsFunction, typeIsUndefined } from '@hooks/type';

import notistack from './notistack';

const apiCatch = (error, setError, setAlertError) => {
    if (error.response) {
        // The client was given an error response (5xx, 4xx)
        const { errors, message, type = 'error' } = error.response.data;
        const status = error.response.status;
        const statusText = error.response.statusText;

        if (status === 422 && typeIsFunction(setError)) {
            for (const [key, value] of Object.entries(errors)) {
                setError(key, {
                    type: 'string',
                    message: value[0],
                });
            }
        } else {
            if (typeIsFunction(setAlertError)) {
                setAlertError(i18next.t(message.length < 1 ? statusText : message));
            } else {
                // eslint-disable-next-line prettier/prettier
                if (['success', 'warning', 'info', 'error', 'default'].some(err => err === 'type')) {
                    // eslint-disable-next-line prettier/prettier
                    notistack[type](i18next.t(typeIsUndefined(message) || message.length < 1 ? statusText : message));
                } else {
                    // eslint-disable-next-line prettier/prettier
                    notistack['error'](i18next.t(typeIsUndefined(message) || message.length < 1 ? statusText : message));
                }
            }
        }
    } else if (error.request) {
        notistack['error']('Belum di setting request.');
    } else {
        notistack['error'](i18next.t(error.toString()));
    }
};

export default apiCatch;
