import { typeIsString } from '@hooks/type';

const display = (key, val) => {
    return typeIsString(val.display)
        ? val.display
        : key
              .toString()
              .replace(/([A-Z])/g, '_$1')
              .toLowerCase()
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
              .join(' ');
};

export default display;
