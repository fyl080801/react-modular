import { IAppModuleFactory, IAppModuleFactoryCreator } from 'index'
import createAppModule from './AppModule'

const factoryCreator: IAppModuleFactoryCreator = name => {
  const states = {}

  const instance = (() => {
    return (factoryCreator.modules[name] = createAppModule(name, states))
  }) as IAppModuleFactory

  instance.createState = (stateName, initData) => {
    states[stateName] = initData
    return instance
  }

  return instance
}

factoryCreator.modules = {}

export default factoryCreator
