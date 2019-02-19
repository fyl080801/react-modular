import { createModule } from '../../package/index'

// 用名称创建模块，并创建模块中包含的 state，赋初始值
// 框架会包装 state 根据需要提供 CRUD 操作，无需手动调用 dispatch 触发先 reducer 中的数据逻辑
// 将来可提供基于路由的设置，用于动态加载组件
export default createModule('m1')
  .createState('demo', { text: 'xxx' })
  .createState('home', { title: 'aaa' })()
