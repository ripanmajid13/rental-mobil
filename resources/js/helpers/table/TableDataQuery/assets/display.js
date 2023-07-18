import { typeIsString } from '@hooks/type';

const display = (key, custom) => {
    return typeIsString(custom)
        ? custom
        : key
              .toString()
              .replace(/([A-Z])/g, '_$1')
              .toLowerCase()
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
              .join(' ');
};

export default display;
