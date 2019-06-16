import { sg2ts }from '../src/index'

describe('main entry', function () {
    describe('normal condition', function () {
        it('should get right result', function () {
            const swaggerDocs = `
        export interface LeaseConsiceOrderView {
            orderNo (string, optional): 订单编号,
            orderType (integer, optional): 订单类型,
            orderStatus (string): 订单状态,
            orderStatusString (integer): 订单状态中文,
            name (string, optional)
            mobile (integer, optional)
            modelName (string)
            vin (integer)
            saleDealerName (array[string], optional): 销售车商名称,
            downPaymentDate (array[integer], optional): 首付支付日期,
            returnCarDate (array[integer]): 应交车日期,
        }
        `
            const out = `
export interface LeaseConsiceOrderView {
    orderNo?: string // 订单编号,
    orderType?: number // 订单类型,
    orderStatus: string // 订单状态,
    orderStatusString: number // 订单状态中文,
    name?: string
    mobile?: number
    modelName: string
    vin: number
    saleDealerName?: Array<string> // 销售车商名称,
    downPaymentDate?: Array<integer> // 首付支付日期,
    returnCarDate: Array<integer> // 应交车日期,
}
`
            expect(sg2ts(swaggerDocs)).toBe(out)
        })
    })

    describe('with option', function () {
        it('should handle with right space ', function () {
            const source = `
            LeaseConsiceOrderView {
                orderType (integer, optional): 订单类型,
                orderStatus (string): 订单状态,
            }
        `
            const out = `
export interface LeaseConsiceOrderView {
  orderType?: number // 订单类型,
  orderStatus: string // 订单状态,
}
`
            expect(sg2ts(source, {space: 2})).toBe(out)

        })
        it('should handle with get header', function () {
            const source = `
            LeaseConsiceOrderView {
                orderType (integer, optional): 订单类型,
                orderStatus (string): 订单状态,
            }
        `
            const out1 = `
export interface LeaseConsiceOrderView {
  orderType?: number // 订单类型,
  orderStatus: string // 订单状态,
}
`
            const out2 = `
interface LeaseConsiceOrderView {
  orderType?: number // 订单类型,
  orderStatus: string // 订单状态,
}
`
            const out3 = `
export LeaseConsiceOrderView {
  orderType?: number // 订单类型,
  orderStatus: string // 订单状态,
}
`
            const out4 = `
LeaseConsiceOrderView {
  orderType?: number // 订单类型,
  orderStatus: string // 订单状态,
}
`
            expect(sg2ts(source, {withInterface: true, withExport: true})).toBe(out1)
            expect(sg2ts(source, {withInterface: true, withExport: false})).toBe(out2)
            expect(sg2ts(source, {withInterface: false, withExport: true})).toBe(out3)
            expect(sg2ts(source, {withInterface: false, withExport: false})).toBe(out4)
        })
    })
})
