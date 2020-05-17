import { Resolver, Ioption } from './resolver'

const sg2ts = function (str: string, option?: Ioption): string {
    return Resolver.getInstance(str, option).getResult()
}

export {
    sg2ts,
    Resolver
}

export default sg2ts
