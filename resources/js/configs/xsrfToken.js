import store from '@store';

import { decrypt } from './crypto';

const xsrfToken = () => {
    const keyDeveloper = 'default-super-admin';
    const dataToken = store.getState().app.app_token
        ? JSON.parse(decrypt(store.getState().app.app_token))
        : null;

    if (dataToken) {
        return {
            ...dataToken,
            super_admin: dataToken.roles.some((dtrs) => dtrs === keyDeveloper),
        };
    } else {
        return {};
    }
};

export default xsrfToken;
