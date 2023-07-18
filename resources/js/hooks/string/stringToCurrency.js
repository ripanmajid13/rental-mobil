const stringToCurrency = (value = '') => {
    let newValue = '';
    const string = value.replace(/[^\d]/g, '').toString(),
        left = string.length % 3,
        rupiah = string.substring(0, left),
        ribuan = string.substring(left).match(/\d{3}/gi);

    newValue = rupiah;

    if (ribuan) {
        newValue += (left ? '.' : '') + ribuan.join('.');
    }

    return newValue;
};

export default stringToCurrency;
