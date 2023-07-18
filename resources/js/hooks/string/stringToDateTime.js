import store from '@store';

const stringToDateTime = (value = '', format = 'Y-m-d H:m:s') => {
    let H, i, s;
    let locale = 'id-ID';

    const getState = store.getState();
    const newDate = value ? new Date(value) : new Date();

    switch (getState.app.app_lang) {
        case 'en':
            locale = 'en-EN';

            H = newDate.toLocaleTimeString(locale, {
                hour12: false,
                hour: '2-digit',
            });
            i = newDate.toLocaleTimeString(locale, {
                hour12: false,
                minute: '2-digit',
            });
            s = newDate.toLocaleTimeString(locale, {
                hour12: false,
                second: '2-digit',
            });
            break;

        default:
            locale = 'id-ID';

            H = ('0' + newDate.toLocaleTimeString(locale, { hour: '2-digit' })).slice(-2);
            i = ('0' + newDate.toLocaleTimeString(locale, { minute: '2-digit' })).slice(-2);
            s = ('0' + newDate.toLocaleTimeString(locale, { second: '2-digit' })).slice(-2);
            break;
    }

    const y = newDate.toLocaleDateString(locale, { year: '2-digit' });
    const Y = newDate.toLocaleDateString(locale, { year: 'numeric' });
    const m = newDate.toLocaleDateString(locale, { month: '2-digit' });
    const M = newDate.toLocaleDateString(locale, { month: 'short' });
    const MM = newDate.toLocaleDateString(locale, { month: 'long' });
    const d = newDate.toLocaleDateString(locale, { day: '2-digit' });
    const w = newDate.toLocaleDateString(locale, { weekday: 'short' });
    const W = newDate.toLocaleDateString(locale, { weekday: 'long' });

    switch (format) {
        case 'Y':
            return `${Y}`;
        case 'Ymd':
            return `${Y}${m}${d}`;
        case 'YmdHms':
            return `${Y}${m}${d}${H}${i}${s}`;
        case 'Y-m-d':
            return `${Y}-${m}-${d}`;
        case 'Y-m-d H:m':
            return `${Y}-${m}-${d} ${H}:${i}`;
        case 'Y-m-d H:m:s':
            return `${Y}-${m}-${d} ${H}:${i}:${s}`;
        case 'md':
            return `${m}${d}`;
        case 'MM Y':
            return `${MM} ${Y}`;
        case 'd/m/Y':
            return `${d}/${m}/${Y}`;
        case 'd/M/Y':
            return `${d}/${M}/${Y}`;
        case 'd/m/Y H:m':
            return `${d}/${m}/${Y} ${H}:${i}`;
        case 'd M Y':
            return `${d} ${M} ${Y}`;
        case 'd M Y H:m':
            return `${d} ${M} ${Y} ${H}:${i}`;
        case 'd M Y H:m:s':
            return `${d} ${M} ${Y} ${H}:${i}:${s}`;
        case 'H:m':
            return `${H}:${i}`;
        case 'H:m:s':
            return `${H}:${i}:${s}`;
        case 'W, d MM Y':
            return `${W}, ${d} ${MM} ${Y}`;

        default:
            return value;
    }
};

export default stringToDateTime;
