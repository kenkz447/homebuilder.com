import * as React from 'react'
import { Provider } from 'react-redux'

import { ExtendedConnectedRouter } from '../../router'

export function createAppContainer(store) {
    return function Main() {
        return (
            <Provider store={store}>
                <ExtendedConnectedRouter />
            </Provider>
        )
    }
}