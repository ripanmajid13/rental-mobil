import Lodash from 'lodash';

const typeIsNull = (data = undefined) => {
    return Lodash.isNull(data);
};

export default typeIsNull;
