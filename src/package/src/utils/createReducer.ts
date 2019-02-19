import { ReducerMap } from 'index'
import { AnyAction } from 'redux'

export default <TState>(
  initState: TState,
  actionHandlerMap: ReducerMap<TState>
): ((state: TState, action: AnyAction) => TState) => {
  return (state = initState, action) => {
    return (actionHandlerMap[action.type] ||
      ((s: TState) => {
        return s
      }))(state, action)
  }
}
