import i18next from 'i18next';

import store from '@store';

import xsrfToken from './xsrfToken';

i18next.init({
    lng: store.getState().app.app_lang,
    debug: false,
    keySeparator: false,
    resources: store.getState().app_token !== null ? xsrfToken().lang : {},
    react: {
        useSuspense: false,
    },
    interpolation: {
        escapeValue: false,
        formatSeparator: ',',
    },
});
