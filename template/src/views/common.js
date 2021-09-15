import {get} from "../util";

export function responseHandler(responseData) {
    responseData.data.rows = responseData.data.rows.map((item) => {
        return {valueCode: item.optionValue, valueName: item.optionText}
    })
    return responseData
}

export function getCurrentUser() {
    return get('/sales' + '/custom/common/getcuruserinfo', {}).then(result => {
        return result.data;
    })
}

export function submitForm(action, data, method) {
    var form = document.createElement('form');
    form.action = action;
    form.method = method || 'get';
    form.target = '_blank';
    for (let key in data) {
        if (Array.isArray(data[key])) {
            data[key].forEach(function (item) {
                add(key, item);
            })
        } else {
            add(key, data[key]);
        }

        function add(name, value) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;

            form.appendChild(input);
        }
    }
    document.body.appendChild(form);

    form.submit();

    setTimeout(function () {
        document.body.removeChild(form);
    }, 1000);
}

export function fun_date(day) {
    let date1 = new Date(),
        time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
    let date2 = new Date(time1);
    date2.setDate(date1.getDate() + day);
    return date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
}

export function dateCompare(date1, date2) {
    let time1 = new Date(date1).getTime();
    let time2 = new Date(date2).getTime();
    return time1 <= time2;
}

export function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        let key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

export function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== "object") return obj;
    if (hash.get(obj)) return hash.get(obj);
    let cloneObj = new obj.constructor();
    hash.set(obj, cloneObj);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }
    return cloneObj;
}



