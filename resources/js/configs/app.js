/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
export const APP_KEY = import.meta.env.VITE_APP_KEY ? import.meta.env.VITE_APP_KEY.substring(7) : '';
export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'APP_NAME';
export const APP_MODULE = import.meta.env.VITE_APP_MODULE === 'TRUE' ? true : false;
export const APP_LAYOUT = import.meta.env.VITE_APP_LAYOUT === 'HORIZONTAL' ? 'HORIZONTAL' : 'VERTICAL';

