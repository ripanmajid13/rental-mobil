const stringToColor = value => {
    if (value) {
        let i;
        let hash = 0;
        let color = '#';
        const setValue = value.toString();

        /* eslint-disable no-bitwise */
        for (i = 0; i < setValue.length; i += 1) {
            hash = setValue.charCodeAt(i) + ((hash << 5) - hash);
        }

        for (i = 0; i < 3; i += 1) {
            color += `00${((hash >> (i * 8)) & 0xff).toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color.toUpperCase();
    } else {
        return '#FFFFFF';
    }
};

export default stringToColor;
