export function toUpperCase(str) {
    return str.replace(/\b[a-z]/g, char => char.toUpperCase());
}

export function uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
        return (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
}

export function parseCookie(cookies) {
    var cookie = '';
    Object.keys(cookies).forEach(item => {
        cookie += `${item}=${cookies[item]};`;
    });
    return cookie;
}

export function toThousands(value) {
    let num = (value || 0).toString();
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}
