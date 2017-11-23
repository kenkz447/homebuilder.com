declare var window: Window & {
    devToolsExtension: any,
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}

import { compose, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import createSagaMiddleware from 'redux-saga'

import { historyMiddleware } from '../../constants'

import rootEpic from './rootEpic'

const epicMiddleware = createEpicMiddleware(rootEpic)

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware()

const middlewares = applyMiddleware(epicMiddleware, historyMiddleware, sagaMiddleware)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default composeEnhancers(middlewares)