import {getSpaces} from './util'

export interface Ioption {
    space?: number
    withInterface?: boolean,
    withExport?: boolean
}
const defaultOption: Partial<Ioption> = {
    space: 4,
    withInterface: true,
    withExport: true
}

export interface ExtractBodyInfo {
    name: string
    type: string
    optional: string
    comment: string
}

export class Resolver {
    private readonly option: Ioption
    private source: string = ''
    private sourceLines: string[] = []
    private resultLines: string[] = []

    static bodyReg: RegExp = /^\s*(\w+)\s*\(([\[\]<>\w]+),?\s*(\w+)?\):?(.+)?/g
    static headReg: RegExp = /^\s*([<>\w]+)\s*{/g
    static arrReg: RegExp = /array\[([<>\w]+)]$/g
    static specialSymbol: RegExp = /([«»])/g


    constructor(source: string, option?: Ioption) {
        this.source = source
        if (option) {
            this.option = Object.assign(defaultOption, option)
        } else {
            this.option = defaultOption
        }
    }

    getResult (): string {
        if (!this.result) {
            this.run()
        }
        return this.result
    }

    get result (): string {
        return this.resultLines.join('\n')
    }

    run () {
        this.sourceLines = this.source.split('\n').map((item: string) => item.trim())
        this.resultLines = this.sourceLines.map(line => {
            line = Resolver.handleSpecialSymbol(line)
            if (Resolver.headReg.test(line)) {
                return this.handleHead(line)
            }
            if (Resolver.bodyReg.test(line)) {
                return this.handleBody(line)
            }
            return line
        })
    }

    static handleSpecialSymbol(line: string): string {
        return line.replace(Resolver.specialSymbol, (_, symbol) => {
            if (symbol === '«') {
                return '<'
            } else if (symbol === '»') {
                return '>'
            } else {
                return symbol
            }
        })
    }

    static extractInfoFromBody(bodyLine: string): ExtractBodyInfo {
        let result: ExtractBodyInfo = {
            name: '',
            type: '',
            comment: '',
            optional: ''
        }
        bodyLine.replace(Resolver.bodyReg, (rawValue, name, type, optional, comment) => {
            comment = comment ? comment.trim() : comment
            result = {
                name,
                type,
                optional,
                comment
            }
            return rawValue
        })
        return result
    }

    handleBody (line: string): string {
        const { space } = this.option
        const {name, type, optional, comment} = Resolver.extractInfoFromBody(line)
        const optionalString = optional ? '?:' : ':'
        const typeString = Resolver.getTypeString(type)
        const commentString = comment ? ` // ${comment}` : ''
        return getSpaces(space) + name + optionalString + ' ' + typeString + commentString
    }


    static extractNameFromHead(headLine: string): string {
        let result = ''
        headLine.replace(Resolver.headReg, (rawValue, name) => {
            result = name
            return rawValue
        })
        return result
    }

    handleHead (line: string): string {
        const { withInterface, withExport } = this.option
        if (withInterface || withExport) {
            const name = Resolver.extractNameFromHead(line)
            let str: string = ''
            if (withExport) {
                str += 'export '
            }
            if (withInterface) {
                str += 'interface '
            }
            str = str + name + ' {'
            return str
        }
        return line
    }

    static getTypeString (type: string): string {
        if (Resolver.isArray(type)){
            return Resolver.parseArray(type)
        }
        switch (type) {
        case 'integer':
            return 'number'
        default:
            return type
        }
    }

    static parseArray (str: string): string {
        return str.replace(Resolver.arrReg, (_, generics) => {
            return `Array<${Resolver.getTypeString(generics)}>`
        })
    }

    static isArray (str: string): boolean {
        return Resolver.arrReg.test(str)
    }

    static getInstance (source: string, option?: Ioption) {
        return new Resolver(source, option)
    }
}


