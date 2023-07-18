import { typeIsArray, typeIsObject } from '@hooks/type';

const url = (uri, key, val) => {
    const action = key
        .toString()
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .split('_')
        .join('-');

    const params =
        val.params && typeIsArray(val.params) && val.params.length > 0
            ? val.params.map((par) => (typeIsObject(par) ? `:${Object.keys(par)}` : `:${par}`))
            : [];

    if (params.length < 1) {
        return { uri, action };
    } else {
        return { uri, params: params.join('/'), action };
    }
};

export default url;
