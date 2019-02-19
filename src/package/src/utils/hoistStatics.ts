const REACT_STATICS = {
  childContextTypes: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
}

const KNOWN_STATICS = {
  arguments: true,
  arity: true,
  callee: true,
  caller: true,
  length: true,
  name: true,
  prototype: true
}

const defineProperty = Object.defineProperty
const getOwnPropertyNames = Object.getOwnPropertyNames
const getOwnPropertySymbols = Object.getOwnPropertySymbols
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
const getPrototypeOf = Object.getPrototypeOf
const objectPrototype = getPrototypeOf && getPrototypeOf(Object)

const hoistNonReactStatics = (target: any, source: any, blacklist?: any[]) => {
  if (typeof source !== 'string') {
    if (objectPrototype) {
      const inheritedComponent = getPrototypeOf(source)
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(target, inheritedComponent, blacklist)
      }
    }

    let keys = getOwnPropertyNames(source)

    if (getOwnPropertySymbols) {
      keys = keys.concat(
        getOwnPropertySymbols(source).map(item => {
          return item.toString()
        })
      )
    }

    keys.forEach(i => {
      const key = keys[i]
      if (
        !REACT_STATICS[key] &&
        !KNOWN_STATICS[key] &&
        (!blacklist || !blacklist[key])
      ) {
        try {
          defineProperty(target, key, getOwnPropertyDescriptor(
            source,
            key
          ) as PropertyDescriptor)
        } catch (e) {
          return
        }
      }
    })

    return target
  }

  return target
}

export default hoistNonReactStatics
