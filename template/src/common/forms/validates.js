const validates = {
    // 必填校验
    required(value, required) {
        if (required && isEmpty(value)) {
            return '请填写此项'
        }
    },

    // 最大长度校验
    maxLength(value, max) {
        max = parseInt(max);
        if (value && max && String(value).length > max) {
            return `输入内容不能超过${max}个字符。`;
        }
    },
    // 最小长度校验
    minLength(value, minlength) {
        minlength = parseInt(minlength);
        if (value && minlength > -1 && String(value).length < minlength) {
            return `输入内容不能小于${minlength}个字符。`;
        }
    },
    min(value, min) {
        min = parseFloat(min);
        if (isNumber(+value) && !isNaN(min) && value < min) {
            return `输入内容不能小于${min}。`;
        }
    },
    max(value, max) {
        max = parseFloat(max);
        if (isNumber(+value) && !isNaN(max) && value > max) {
            return `输入内容不能大于${max}。`;
        }
    },
    isCardId(value, required) {
        let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
        if (required && value && !reg.test(value)) {
            return '请输入格式正确身份证编号。'
        }
    },
    // 输入内容为长度不超过30，非负浮点数
    float(value, tested) {
        const reg = /^\d+(\.\d+)?$/
        if (value && tested) {
            if (!reg.test(value)) {
                return '请输入正确的数字类型。'
            }
            if (value.length > 30) {
                return '输入内容长度不能超过30个字符。'
            }
        }
    },
    // 非负整数校验
    nonNegativeInteger(value, tested) {
        const reg = /^[0-9]+[0-9]*$/;
        if (value && tested) {
            if (!reg.test(value)) {
                return '请输入非负整数。'
            }
            if (value.length > 30) {
                return '输入内容长度不能超过30个字符。'
            }
        }
    },
    // 整数校验
    integer(value, tested) {
        const reg = /^(-)?\d+$/;
        if (value && tested) {
            if (!reg.test(value)) {
                return '请输入整数。'
            }
            if (value.length > 30) {
                return '输入内容长度不能超过30个字符。'
            }
        }
    },
    // 校验不能输入纯数字和特殊符号
    specialVal(value, tested) {
        const reg1 = /^\+?[0-9][0-9]*$/  // 校验纯数字
        const reg2 = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
        const reg3 = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (value && tested) {
            if (reg1.test(value)) {
                return `输入内容不能为纯数字。`
            }
            if (reg2.test(value) || reg3.test(value)) {
                return '输入内容不能包含特殊字符。'
            }
        }
    },
    houseLocal(value, tested) {
        const reg1 = /^\+?[0-9][0-9]*$/  // 校验纯数字
        const reg2 = /[`~@￥#$%^&*+<>?《》{}\/[\]]/im
        if (value && tested) {
            if (reg1.test(value)) {
                return `输入内容不能为纯数字。`
            }
            if (reg2.test(value)) {
                return '输入内容不能包含特殊字符。'
            }
        }
    }
};

function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

function isEmpty(value) {
    if (value == null || value === '' || value !== value || (Array.isArray(value) && !value.length)) {
        return true;
    }
}

export default validates;
