const stringToInitial = value => {
    if (value) {
        let initial = '';
        const setValue = value.toString();

        setValue.split(' ').map((val, key) => {
            if (key <= 2) {
                initial += val.charAt(0);
            }
        });

        return initial.toUpperCase();
    } else {
        return '';
    }
};

export default stringToInitial;
