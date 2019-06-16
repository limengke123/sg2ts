import * as util from '../src/util'

describe('util', function () {
    describe('util.getSpaces', function () {
        it('should get number of space', function () {
            const { getSpaces } = util
            expect(getSpaces(4)).toBe('    ')
            expect(getSpaces(0)).toBe('')
            expect(getSpaces()).toBe('')
        })
    })
})
