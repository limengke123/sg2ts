const sg2ts = function (str, options = {}) {
    const {
        space = 2,
        withInterface = true
    } = options;
    const reg = /^\s*(\w+)\s*\(([\[\]\w]+),?\s*(\w+)?\):?(.+)?/g;
    const lines = str.split('\n');
    const result = lines.map(line => {
        return line.replace(reg, (_, name, type, optional, comment) => {
            const optionalString = optional ? '?:' : ':';
            const typeString = getTypeString(type);
            const commentString = comment ? ` //${comment}` : '';
            return ' '.repeat(space) + name + optionalString + ' ' + typeString + commentString
        })
    });
    console.log(result.join('\n'))
};

const getTypeString = type => {
    if (isArray(type)){
        return parseArray(type)
    }
    switch (type) {
        case 'integer':
            return 'number';
        default:
            return type
    }
};

const arrReg = /array\[(\w+)]$/g;
const isArray = str => {
    return arrReg.test(str)
};

const parseArray = str => {
    return str.replace(arrReg, (_, generics) => {
        return `Array<${generics}>`
    })
};

module.exports = {
    sg2ts
};

module.exports.default = {
    sg2ts
};
