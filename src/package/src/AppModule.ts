import { IAppComponentFactory, IAppModule } from 'index'
import { Store } from 'redux'
import createComponentFactory from './ComponentFactory'

class AppModule implements IAppModule {
  private isInitialized: boolean
  private globalStore: Store

  constructor(private name: string, private states: any) {
    this.isInitialized = false
  }

  public initialize(store: Store) {
    if (this.isInitialized === true) {
      return
    }
    this.globalStore = store
    this.isInitialized = true
  }

  public connect(componentType: any): IAppComponentFactory {
    return createComponentFactory(componentType)
  }

  public getState() {
    // 返回当前模块的state，是否要返回一个副本？
    return this.isInitialized
      ? Object.assign({}, this.globalStore.getState()[this.name])
      : this.states
  }
}

export default (name: string, states: any): IAppModule => {
  return new AppModule(name, states)
}
