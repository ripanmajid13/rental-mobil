import CryptoJS from 'crypto-js';

import {
    STORE_TYPE_APP_FLUSH_CACHE,
    STORE_TYPE_APP_LOGIN,
    STORE_TYPE_APP_LOGOUT,
    STORE_TYPE_APP_MODULE,
    STORE_TYPE_APP_STATE,
    STORE_TYPE_APP_XSRF_TOKEN,
} from '@store/type/app';

const encryptData = localStorage.getItem(STORE_TYPE_APP_XSRF_TOKEN)
    ? CryptoJS.enc.Base64.parse(localStorage.getItem(STORE_TYPE_APP_XSRF_TOKEN)).toString(
          CryptoJS.enc.Utf8
      )
    : null;
const encryptDataParse = encryptData !== null ? JSON.parse(encryptData) : null;

const tokenDecrypt =
    encryptDataParse !== null
        ? CryptoJS.AES.decrypt(
              encryptDataParse.value,
              CryptoJS.enc.Base64.parse(
                  import.meta.env.VITE_APP_KEY ? import.meta.env.VITE_APP_KEY.substring(7) : ''
              ),
              {
                  iv: CryptoJS.enc.Base64.parse(encryptDataParse.iv),
                  mode: CryptoJS.mode.CBC,
                  padding: CryptoJS.pad.Pkcs7,
              }
          ).toString(CryptoJS.enc.Utf8)
        : null;

const initialState = {
    app_auth: localStorage.getItem(STORE_TYPE_APP_XSRF_TOKEN) ? true : false,
    app_lang: localStorage.getItem(STORE_TYPE_APP_XSRF_TOKEN + '_LANG') || 'id',
    app_token: localStorage.getItem(STORE_TYPE_APP_XSRF_TOKEN) ?? null,
    app_module: localStorage.getItem(STORE_TYPE_APP_XSRF_TOKEN)
        ? tokenDecrypt !== null
            ? JSON.parse(tokenDecrypt).module
            : ''
        : '',
    // app_module_on: localStorage.getItem(STORE_TYPE_APP_XSRF_TOKEN)
    // ? MODULE_APP === 'TRUE' &&
    //   ((tokenDecrypt !== null && JSON.parse(tokenDecrypt).module === undefined) ||
    //       JSON.parse(tokenDecrypt).module?.length < 1)
    //     ? true
    //     : false
    // : false,
    //     app_token_name: APP_XSRF_TOKEN,
    //     app_sidebar_show: true,
    app_backdrop_open: false,
    app_backdrop_content: 'Loading',
    app_backdrop_progress: '',
};

const app = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case STORE_TYPE_APP_LOGIN:
            localStorage.setItem(STORE_TYPE_APP_XSRF_TOKEN, rest.token);

            return {
                ...state,
                app_token: rest.token,
                app_backdrop_open: true,
                app_backdrop_content: rest.content,
            };

        case STORE_TYPE_APP_LOGOUT:
            localStorage.removeItem(STORE_TYPE_APP_XSRF_TOKEN);
            localStorage.removeItem(STORE_TYPE_APP_XSRF_TOKEN + '_LANG');

            return {
                ...state,
                app_auth: false,
                app_module: '',
            };

        case STORE_TYPE_APP_FLUSH_CACHE:
            localStorage.setItem(STORE_TYPE_APP_XSRF_TOKEN, rest.token);

            return {
                ...state,
                app_token: rest.token,
                app_backdrop_open: false,
            };

        case STORE_TYPE_APP_MODULE:
            localStorage.setItem(STORE_TYPE_APP_XSRF_TOKEN, rest.token);

            return {
                ...state,
                app_token: rest.token,
                app_module: rest.module,
            };

        // case APP_LANGUAGE:
        //     localStorage.setItem(APP_XSRF_TOKEN + '_LANG', rest.lang);

        //     return {
        //         ...state,
        //         app_lang: rest.lang,
        //     };

        // case APP_MODULE:
        //     localStorage.setItem(APP_XSRF_TOKEN, rest.token);

        //     return {
        //         ...state,
        //         app_token: rest.token,
        //         app_module: rest.module,
        //     };

        case STORE_TYPE_APP_STATE:
            return {
                ...state,
                ...rest,
            };

        default:
            return state;
    }
};

export default app;
