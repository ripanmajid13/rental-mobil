import { typeIsBoolean, typeIsFunction } from '@hooks/type';

const disabled = (val, selectedRow) => {
    if (typeIsBoolean(val.data) && val.data === true) {
        if (typeIsFunction(val.disabled)) {
            if (val.dataMultiple === true) {
                if (typeIsBoolean(val.disabled([]))) {
                    return val.disabled(selectedRow.length < 1 ? [] : selectedRow);
                }
            } else {
                if (typeIsBoolean(val.disabled({}))) {
                    return val.disabled(selectedRow.length < 1 ? {} : selectedRow[0]);
                }
            }
        } else {
            if (val.dataMultiple === true) {
                return selectedRow.length < 1;
            } else {
                return selectedRow.length !== 1;
            }
        }
    } else {
        return false;
    }
};

export default disabled;
