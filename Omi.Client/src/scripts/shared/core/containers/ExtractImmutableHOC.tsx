import { isImmutable } from 'immutable'
import * as React from 'react'

export const ExtractImmutableHOC = (WrappedComponent) => (wrappedComponentProps) => {
  const KEY = 0
  const VALUE = 1

  const propsJS = Object.entries(
    wrappedComponentProps
  ).reduce((newProps, wrappedComponentProp) => { 
    newProps[wrappedComponentProp[KEY]] = isImmutable(
      wrappedComponentProp[VALUE]
    ) 
      ? wrappedComponentProp[VALUE].toJS()
      : wrappedComponentProp[VALUE]
    return newProps
  }, {})

  return <WrappedComponent {...propsJS} />
} 