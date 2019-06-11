const sw2ts = require('../src');

const swaggerDocs = `
   WorkOrderView {
    id?: string //  工单信息: 工单id,
    cityCode?: string //  工单信息: 城市code,
    cityName?: string //  工单信息: 城市名称,
    phone?: string //  工单信息: 手机号,
    type?: string //  工单信息: 工单类型,
    typeString?: string //  工单信息: 工单类型 中文,
    number?:  string//  工单信息: 工单编号,
    dateCreate?: string //  工单信息: 创建时间,
    dateUpdate?: string //  工单信息: 最后更新时间,
    transactor?: string //  工单信息: 处理人id,
    transactorName?: string //  工单信息: 处理人name,
    status?: number //  工单信息: 工单状态 0:待处理 1:处理中 2:已解决,
    statusString?: number //  工单信息: 工单状态 0:待处理 1:处理中 2:已解决, 中文
    description?: string //  工单信息: 问题描述,
    creatorId?: string //  工单信息: 创建人id,
    creatorName?: string //  工单信息: 创建人名称,
    source?: string //  工单信息: 工单来源,
    carType?: string //  订单信息: 车型,
    orderType?: string //  订单信息: 订单类型,
    orderTypeString?: string //  订单信息: 订单类型的中文,
    orderNo?: string //  订单信息: 订单编号,
    orderStatus?: string //  订单信息: 订单状态,
    vin?: string //  订单信息: vin码,
    overTimeDay?: number //  订单信息: 超时天数,
    saleDealerCode?: string //  订单信息: 销售车商code,
    saleDealerName?: string //  订单信息: 销售车商名称,
    downPaymentDate?: string //  订单信息: 首付支付日期,
    returnCarDate?: string //  订单信息: 应交车日期,
    orderStatusString?: string //
    sourceString?: string // 来源
    feedbackDos?: Array<FeedbackDo> //  回复记录列表(工单反馈列表),
    // workOrderDos?: Array<WorkOrderDo> //  订单相关的工单列表
    workOrders?: Array<WorkOrderDo>  // 订单相关
} 
`;

const result = sw2ts(swaggerDocs);
console.log(result);
