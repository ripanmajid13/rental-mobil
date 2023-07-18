import CryptoJS from 'crypto-js';
import { APP_KEY } from './app';
// import { APP_LOGOUT } from '@constants/storeAppConstant';

const encrypt = (decrypted, key = '') => {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(decrypted, key || CryptoJS.enc.Base64.parse(APP_KEY), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    }).toString();

    return CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(
            JSON.stringify({
                iv: CryptoJS.enc.Base64.stringify(iv),
                value: encrypted,
                mac: CryptoJS.HmacSHA256(
                    CryptoJS.enc.Base64.stringify(iv) + encrypted,
                    CryptoJS.enc.Base64.parse(APP_KEY)
                ).toString(),
            })
        )
    );
};

const decrypt = (encrypted) => {
    try {
        const encryptData = CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Utf8);
        const encryptDataParse = JSON.parse(encryptData);

        return CryptoJS.AES.decrypt(encryptDataParse.value, CryptoJS.enc.Base64.parse(APP_KEY), {
            iv: CryptoJS.enc.Base64.parse(encryptDataParse.iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        // store.dispatch({
        //     type: APP_LOGOUT,
        // });
    }
};

export { encrypt, decrypt };
