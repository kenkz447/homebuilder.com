import { Map } from 'immutable'
import { Action } from 'redux'
import { statePipe } from './../../utilities/reducerPipe'
import { PAGE_CHANGE } from './keys'
import { PageChangeAction } from './actions'

const setCurrentPageTitle = (action: PageChangeAction) => (state: Map<string, any>) => state.set('currentPageTitle', action.pageOptions.pageTitle || "Missing Page Title")

const initState: Map<string, any> = Map({})

export const reducer = (state = initState, action: Action) => {
    switch (action.type) {
        case PAGE_CHANGE:
            return statePipe([setCurrentPageTitle(action as PageChangeAction)], state)
        default:
            return state
    }
}