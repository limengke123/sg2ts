import {getSpaces} from './util'

export interface Ioption {
    space?: number
    withInterface?: boolean
}
const defaultOption: Partial<Ioption> = {
    space: 4,
    withInterface: true
}

export class Resolver {
    private option: Ioption
    private source: string = ''
    private sourceLines: string[] = []
    private resultLines: string[] = []

    private bodyReg: RegExp = /^\s*(\w+)\s*\(([\[\]\w]+),?\s*(\w+)?\):?(.+)?/g
    private arrReg: RegExp = /array\[(\w+)]$/g


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
        const { space } = this.option
        this.sourceLines = this.source.split('\n').map((item: string) => item.trim())
        this.resultLines = this.sourceLines.map(line => {
            return line.replace(this.bodyReg, (_, name, type, optional, comment) => {
                const optionalString = optional ? '?:' : ':'
                const typeString = this.getTypeString(type)
                const commentString = comment ? ` //${comment}` : ''
                return getSpaces(space) + name + optionalString + ' ' + typeString + commentString
            })
        })
    }

    static getInstance (source: string, option?: Ioption) {
        return new Resolver(source, option)
    }

    getTypeString (type: string): string {
        if (this.isArray(type)){
            return this.parseArray(type)
        }
        switch (type) {
        case 'integer':
            return 'number'
        default:
            return type
        }
    }

    parseArray (str: string): string {
        return str.replace(this.arrReg, (_, generics) => {
            return `Array<${generics}>`
        })
    }

    isArray (str: string): boolean {
        return this.arrReg.test(str)
    }

}


