import { List, fromJS } from 'immutable'

import { INIT_ROUTES } from './keys'
import { InitRoutesAction } from './actions'

const initState = List([])

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_ROUTES:
            return fromJS((action as InitRoutesAction).routes)
        default:
            return state
    }
}