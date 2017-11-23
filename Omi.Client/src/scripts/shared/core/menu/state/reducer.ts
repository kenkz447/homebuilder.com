import { fromJS, Map } from 'immutable'

import { InitMenuAction } from './Actions'
import { INIT_MENU } from './keys'

const initState = Map({})

export const reducer = (state = initState, action: InitMenuAction) => {
    switch (action.type) {
        case INIT_MENU:
            return fromJS(action.menuCollection)
        default:
            return state
    }
}