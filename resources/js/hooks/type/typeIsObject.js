import Lodash from 'lodash';

const typeIsObject = (data = undefined) => {
    return Lodash.isObject(data) === true && Lodash.isArray(data) !== true;
};

export default typeIsObject;
