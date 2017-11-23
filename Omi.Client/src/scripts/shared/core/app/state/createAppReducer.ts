import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import { reducer as routes } from '../../router'

import { ReducerRootState } from '../../types'
import { reducer as menus } from '../../menu'
import { reducer as layout } from '../../layout'
import { reducer as page } from '../../page'
import { reducer as data } from '../../data'
import { reducer as temp } from '../../tempValue'
import { reducer as localization } from '../../localization'

const appReducer: ReducerRootState = {
    router: routerReducer,
    routes,
    menus,
    layout,
    page,
    data,
    temp,
    localization
}

export function createAppReducer(reducers) {
    return combineReducers({
        ...appReducer,
        ...reducers,
        loadingBar: loadingBarReducer
    })
}