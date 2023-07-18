import Lodash from 'lodash';

const typeIsString = (data = undefined) => {
    return Lodash.isString(data) === true;
};

export default typeIsString;
