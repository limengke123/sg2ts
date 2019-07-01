# sg2ts

解析 swagger 文档成typescript的interface工具。可以访问[这里来使用在线转换页面](https://limengke123.github.io/tiny-waffle/#/sg2ts)。

## 用法

### 安装：

```bash
yarn add sg2ts

# or npm
npm install sg2ts

```

### 使用：

```javascript
import sg2ts from 'sg2ts'

const result = sg2ts('workOrders (array[WorkOrderDo], optional): 订单相关的工单列表,', {
    space: 2,
    withInterface: true,
    withExport: true,
})

console.log(result)  // workOrders?: Array<WorkOrderDo> // 订单相关的工单列表,
```

### option

| option | 类型 | 意义 | 默认值 |
| --- | --- | --- | --- |
| space | number | 每个字段前置 | 4 |
| withInterface | boolean | 是否自动带上 `interface` 关键字 | true |
| withExport | boolean | 是否自动带上 `export` 关键字 | true |
