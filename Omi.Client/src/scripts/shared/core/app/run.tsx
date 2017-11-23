import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { createAppContainer } from './containers/AppContainer'

const LocaleProvider = require('antd/lib/locale-provider')
const enUS = require('antd/lib/locale-provider/en_US')

const renderAppContainer = (Container) => {
    ReactDOM.render(
        <LocaleProvider locale={enUS}>
            <AppContainer>
                <Container />
            </AppContainer>
        </LocaleProvider>
        ,
        document.getElementById('root')
    )
}

/**
 * Call to start showing your application
 * @param store Main store
 */
export default function (store, reducers) {
    const AppContainer = createAppContainer(store)
    renderAppContainer(AppContainer)
}