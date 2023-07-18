import Lodash from 'lodash';

const typeIsBoolean = (data = undefined) => {
    return Lodash.isBoolean(data) === true;
};

export default typeIsBoolean;
