import { matchPath } from 'react-router-dom';

import { APP_MODULE } from '@configs/app';

import { typeIsString } from '@hooks/type';

const title = (key, display, patname, permissions) => {
    const access = permissions.filter((ups) => matchPath(ups.uri, patname));

    if (access.length < 1) {
        return typeIsString(display)
            ? display
            : key
                  .toString()
                  .replace(/([A-Z])/g, '_$1')
                  .toLowerCase()
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
                  .join(' ');
    } else {
        if (APP_MODULE === true) {
            return 'module-pathname-' + access[0].name;
        } else {
            return 'pathname-' + access[0].name;
        }
    }
};

export default title;
