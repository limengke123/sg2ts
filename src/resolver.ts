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

export class Resolver {
    private readonly option: Ioption
    private source: string = ''
    private sourceLines: string[] = []
    private resultLines: string[] = []

    private bodyReg: RegExp = /^\s*(\w+)\s*\(([\[\]«»\w]+),?\s*(\w+)?\):?(.+)?/g
    private headReg: RegExp = /^\s*(\w+)\s*{/g
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
        this.sourceLines = this.source.split('\n').map((item: string) => item.trim())
        this.resultLines = this.sourceLines.map(line => {
            if (this.headReg.test(line)) {
                return this.handleHead(line)
            }
            if (this.bodyReg.test(line)) {
                return this.handleBody(line)
            }
            return line
        })
    }

    handleBody (line: string): string {
        const { space } = this.option
        return line.replace(this.bodyReg, (_, name, type, optional, comment) => {
            const optionalString = optional ? '?:' : ':'
            const typeString = this.getTypeString(type)
            const commentString = comment ? ` //${comment}` : ''
            return getSpaces(space) + name + optionalString + ' ' + typeString + commentString
        })
    }

    handleHead (line: string): string {
        const { withInterface, withExport } = this.option
        if (withInterface || withExport) {
            // pass
            return line.replace(this.headReg, (_, name) => {
                let str: string = ''
                if (withExport) {
                    str += 'export '
                }
                if (withInterface) {
                    str += 'interface '
                }
                str = str + name + ' {'
                return str
            })
        }
        return line
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

    static getInstance (source: string, option?: Ioption) {
        return new Resolver(source, option)
    }
}


