import Lodash from 'lodash';

const typeIsArray = (data = undefined) => {
    return Lodash.isArray(data) === true;
};

export default typeIsArray;
