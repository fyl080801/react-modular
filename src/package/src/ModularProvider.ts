import { ModularProviderProps } from 'index'
import * as React from 'react'
import { storeShape } from './utils/propTypes'

export const createProvider = () => {
  return class ModularProvider<
    P extends ModularProviderProps,
    S,
    SS
  > extends React.PureComponent<P, S, SS> {
    public static childContextTypes = {
      store: storeShape.isRequired
    }

    public store: any

    constructor(props: P, context?: any) {
      super(props, context)
      this.store = props.store
    }

    public getChildContext() {
      return {
        store: this.props.store
      }
    }

    public render() {
      return React.Children.only(this.props.children)
    }
  }
}

export default createProvider()
