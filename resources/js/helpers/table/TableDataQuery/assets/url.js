import { typeIsArray, typeIsObject } from '@hooks/type';

const url = (key, uri, params) => {
    const action = key
        .toString()
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .split('_')
        .join('-');

    const newParams =
        typeIsArray(params) && params.length > 0
            ? params.map((par) => (typeIsObject(par) ? `:${Object.keys(par)}` : `:${par}`))
            : [];

    if (newParams.length < 1) {
        return { uri, action };
    } else {
        return { uri, params: newParams.join('/'), action };
    }
};

export default url;
