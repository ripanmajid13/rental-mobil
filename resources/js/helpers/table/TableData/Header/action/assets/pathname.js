import { typeIsArray, typeIsObject } from '@hooks/type';

const pathname = (uri, key, val, selectedRow) => {
    const action = key
        .toString()
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .split('_')
        .join('-');

    const params =
        val.params && typeIsArray(val.params) && val.params.length > 0
            ? val.params.map((par) =>
                  typeIsObject(par)
                      ? `${Object.values(par)}`
                      : selectedRow.length < 1
                      ? ''
                      : selectedRow[0][par] ?? ''
              )
            : [];

    if (params.filter((pars) => pars.length > 0).length < 1) {
        return `${uri}/${action}`;
    } else {
        return `${uri}/${params.filter((pars) => pars.length > 0).join('/')}/${action}`;
    }
};

export default pathname;
