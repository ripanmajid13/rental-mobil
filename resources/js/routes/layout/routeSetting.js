import {
    routePageMainMenu,
    routePageNavigation,
    routePagePrivate,
    routePageSetting,
} from '@routes/page';

const routeSetting = () => {
    return routePageMainMenu.concat(routePageNavigation, routePagePrivate, routePageSetting);
};

export default routeSetting;
