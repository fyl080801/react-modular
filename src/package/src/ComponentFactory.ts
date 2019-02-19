import { IAppComponentFactory } from 'index'
import * as React from 'react'
import hoistStatics from './utils/hoistStatics'

export default (componentType: any) => {
  // const wrapComponentType = componentType;

  const factory = ((options?: any) => {
    const { pure = true } = options

    class Connected extends React.Component {
      private haveOwnPropsChanged: boolean

      private hasStoreStateChanged: boolean

      public shouldComponentUpdate() {
        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
      }

      public render() {
        return React.createElement(componentType)
      }
    }
    return hoistStatics(Connected, componentType)
  }) as IAppComponentFactory

  // factory.mapState = () => {
  //   return factory;
  // };

  // factory.mapDispatch = () => {
  //   return factory;
  // };

  factory.mapProps = ownProps => {
    return factory
  }

  return factory
}
