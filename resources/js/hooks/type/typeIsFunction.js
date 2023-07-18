import Lodash from 'lodash';

const typeIsFunction = (data = undefined) => {
    return Lodash.isFunction(data) === true;
};

export default typeIsFunction;
