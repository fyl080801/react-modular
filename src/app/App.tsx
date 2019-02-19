import * as React from 'react'
import './App.css'

import { createModularStore, ModularProvider } from '../package/index'
import logo from './logo.svg'

// 在应用入口导入模块
import '../modules/m1/module'

// 在没有集成路由加载的时候先固定引用组件
import TestView from '../modules/m1/views/TestView'

class App extends React.Component {
  public render() {
    return (
      // 使用一个 Provider 作为最外层容器传递一个 store(如果用react-redux提供的provider也行)
      // store 的初始化时会根据模块自动初始化 reducer 逻辑
      <ModularProvider store={createModularStore()}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React...</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
          <TestView />
        </div>
      </ModularProvider>
    )
  }
}

export default App
