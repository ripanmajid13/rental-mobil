import { matchPath } from 'react-router-dom';

import xsrfToken from '@configs/xsrfToken';

const permission = (url) => {
    return (
        xsrfToken().super_admin ||
        xsrfToken().permissions.some((ups) => matchPath(ups.uri, Object.values(url).join('/')))
    );
};

export default permission;
