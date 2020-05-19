import {Resolver} from '../src'
import {splitTypeEnum} from '../src/resolver'


describe('should handle raw value correctly', function () {

    it('should extra name from headData correctly', function () {
        const before = 'LeaseConsiceOrderView {'
        expect(Resolver.extractNameFromHead(before)).toBe('LeaseConsiceOrderView')
    })


    it('should extra data from Body correctly', function () {
        const before = 'orderNo (string, optional): 订单编号,'
        const result = Resolver.extractInfoFromBody(before)
        expect(result.name).toBe('orderNo')
        expect(result.optional).toBe('optional')
        expect(result.type).toBe('string')
        expect(result.comment).toBe('订单编号,')
    })


    it('should handle special symbol correctly', function () {
        expect(Resolver.handleSpecialSymbol('«')).toBe('<')
        expect(Resolver.handleSpecialSymbol('»')).toBe('>')
        expect(Resolver.handleSpecialSymbol('=')).toBe('=')
    })


    it('should return base type correctly', function () {
        expect(Resolver.getTypeString('string')).toBe('string')
        expect(Resolver.getTypeString('integer')).toBe('number')
    })


    it('should parse array correctly', function () {
        const arrayString = 'array[integer]'
        const expectResult = 'Array<number>'
        expect(Resolver.parseArray(arrayString)).toBe(expectResult)
    })


    it('should judge array correctly', function () {
        const array = 'array[integer]'
        expect(Resolver.isArray(array)).toBeTruthy()
        const nonArray = 'integer'
        expect(Resolver.isArray(nonArray)).toBeFalsy()
    })


    it('应该支持不同的分割方式', function () {
        const before = 'uid (string, optional): uid, title (string, optional): 标题, tabCode (string, optional): tab code'
        const after = ['uid (string, optional): uid,', 'title (string, optional): 标题,', 'tabCode (string, optional): tab code']
        const resolver = new Resolver(before, {
            splitType: splitTypeEnum.comma
        })
        // const reg = /([%da-zA-Z_]+[\s]+\([a-z,\s]+\)[:\s\u4e00-\u9fa5a-zA-z]*,)/g
        expect(resolver.splitToList()).toEqual(after)


        const before2 = 'ehicleCarAssistantVO { id (integer, optional): 主键id, uid (string, optional): uid }'
        resolver.setSource(before2)
        const expected = [
            'ehicleCarAssistantVO {',
            'id (integer, optional): 主键id,',
            'uid (string, optional): uid',
            '}'
        ]
        expect(resolver.splitToList()).toEqual(expected)
    })
})

