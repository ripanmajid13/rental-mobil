import Lodash from 'lodash';

const typeIsUndefined = (data = undefined) => {
    return Lodash.isUndefined(data);
};

export default typeIsUndefined;
