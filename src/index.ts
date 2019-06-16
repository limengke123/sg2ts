import { Resolver, Ioption } from './resolver'

export const sg2ts = function (str: string, option?: Ioption): string {
    return Resolver.getInstance(str, option).getResult()
}
