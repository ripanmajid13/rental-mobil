import { typeIsArray, typeIsObject } from '@hooks/type';

const pathname = (key, uri, params, selectedRow) => {
    const action = key
        .toString()
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .split('_')
        .join('-');

    const newParams =
        typeIsArray(params) && params.length > 0
            ? params.map((par) => (typeIsObject(par) ? Object.values(par) : selectedRow[par] ?? ''))
            : [];

    if (newParams.filter((pars) => pars.length > 0).length < 1) {
        return `${uri}/${action}`;
    } else {
        return `${uri}/${newParams.filter((pars) => pars.length > 0).join('/')}/${action}`;
    }
};

export default pathname;
