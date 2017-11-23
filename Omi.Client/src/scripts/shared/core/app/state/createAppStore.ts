import { createStore, Store as ReduxStore } from 'redux'
import { fork } from 'redux-saga/effects'

import concat = require('lodash/concat')

import middlewares, { sagaMiddleware } from './middleware'

import { layoutSagas } from '../../layout'
import { dataSagas } from '../../data'
import { notificationSagas } from '../../notification'
import { localizationSagas } from '../../localization'

const coreSagas = [layoutSagas, dataSagas, notificationSagas, localizationSagas]

function startSagas(sagas) {
    return function* rootSaga() {
        yield sagas.map((saga) => fork(saga))
    }
}

export function createAppStore(sagaMiddlewares: Array<any> = [], reducers) {
    const store: ReduxStore<any> = createStore(reducers, {}, middlewares)

    // Combin app Sagas and additional Sagas
    // Then create root saga and run it
    const sagas = concat(coreSagas, sagaMiddlewares)
    const rootSaga = startSagas(sagas)
    sagaMiddleware.run(rootSaga)

    return store
}