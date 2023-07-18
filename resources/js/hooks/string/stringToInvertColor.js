const stringToInvertColor = (value, bw = false) => {
    if (value) {
        const reg = /^#([0-9A-F]{3}){1,2}$/i;
        if (reg.test(value)) {
            let hex = value;

            if (hex.indexOf('#') === 0) {
                hex = hex.slice(1);
            }

            // convert 3-digit hex to 6-digits.
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }

            if (hex.length !== 6) {
                return '#000000';
            }

            let r = parseInt(hex.slice(0, 2), 16),
                g = parseInt(hex.slice(2, 4), 16),
                b = parseInt(hex.slice(4, 6), 16);

            if (bw) {
                return r * 0.299 + g * 0.587 + b * 0.114 > 186
                    ? '#000000'
                    : '#FFFFFF';
            } else {
                // invert color components
                r = (255 - r).toString(16);
                g = (255 - g).toString(16);
                b = (255 - b).toString(16);

                r = (new Array(2).join('0') + r).slice(-2);
                g = (new Array(2).join('0') + g).slice(-2);
                b = (new Array(2).join('0') + b).slice(-2);

                return ('#' + r + g + b).toUpperCase();
            }
        } else {
            return '#000000';
        }
    } else {
        return '#000000';
    }
};

export default stringToInvertColor;
