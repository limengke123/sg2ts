const {sg2ts} = require('../lib/index')

const swaggerDocs = `
export interface LeaseConsiceOrderView {
    orderNo (string, optional): 订单编号,
    orderType (string, optional): 订单类型,
    orderStatus (string, optional): 订单状态,
    orderStatusString (string, optional): 订单状态中文,
    name (string, optional): 用户姓名,
    mobile (string, optional): 用户手机号,
    modelName (string, optional): 车型,
    vin (string, optional): VIN码,
    saleDealerName (string, optional): 销售车商名称,
    downPaymentDate (string, optional): 首付支付日期,
    returnCarDate (string, optional): 应交车日期,
    leaseOrderDetail (string, optional): 订单详情链接,
    leaseOrderMonitor (string, optional): 订单监控链接
}
`

const result = sg2ts(swaggerDocs)
console.log(result)
