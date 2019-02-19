import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import factoryCreator from './createModule'

import createReducer from './utils/createReducer'

const createReducers = () => {
  const reducers: any = {}

  Object.keys(factoryCreator.modules).forEach(moduleName => {
    const moduleReducers: any = {}
    const moduleState = factoryCreator.modules[moduleName].getState()

    Object.keys(moduleState).forEach(stateName => {
      moduleReducers[
        moduleName.toUpperCase() + '_' + stateName.toUpperCase() + '_UPDATE'
      ] = (state: any, action: AnyAction) => {
        return Object.assign(state, action.data)
      }
    })

    reducers[moduleName] = createReducer(moduleState, moduleReducers)
  })

  return combineReducers(reducers)
}

export default (initialState?: any) => {
  const initedStore = applyMiddleware()(createStore)(
    createReducers(),
    initialState
  )

  Object.keys(factoryCreator.modules).forEach(moduleName => {
    factoryCreator.modules[moduleName].initialize(initedStore)
  })

  return initedStore
}
