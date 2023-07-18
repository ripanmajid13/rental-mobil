import { matchPath } from 'react-router-dom';

import xsrfToken from '@configs/xsrfToken';

import { typeIsString } from '@hooks/type';

const title = (url, key, val) => {
    const permission = xsrfToken().permissions.filter((ups) =>
        matchPath(ups.uri, Object.values(url).join('/'))
    );

    if (permission.length < 1) {
        return typeIsString(val.display)
            ? val.display
            : key
                  .toString()
                  .replace(/([A-Z])/g, '_$1')
                  .toLowerCase()
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
                  .join(' ');
    } else {
        return 'pathname-' + permission[0].name;
    }
};

export default title;
