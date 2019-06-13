import { getSpaces } from './util'
export interface option {
    space?: number
    withInterface?: boolean
}
export const sg2ts = function (str: string, option:option = {space: 2, withInterface: true}) {
    const {
        space,
        withInterface
    } = option
    const reg: RegExp = /^\s*(\w+)\s*\(([\[\]\w]+),?\s*(\w+)?\):?(.+)?/g
    const lines = str.split('\n')
    const result = lines.map(line => {
        return line.replace(reg, (_, name, type, optional, comment) => {
            const optionalString = optional ? '?:' : ':'
            const typeString = getTypeString(type)
            const commentString = comment ? ` //${comment}` : ''
            return getSpaces(space) + name + optionalString + ' ' + typeString + commentString
        })
    })
    console.log(result.join('\n'))
}

const getTypeString = (type: string): string => {
    if (isArray(type)){
        return parseArray(type)
    }
    switch (type) {
    case 'integer':
        return 'number'
    default:
        return type
    }
}

const arrReg: RegExp = /array\[(\w+)]$/g
const isArray = (str: string): boolean => {
    return arrReg.test(str)
}

const parseArray = (str: string): string => {
    return str.replace(arrReg, (_, generics) => {
        return `Array<${generics}>`
    })
}
