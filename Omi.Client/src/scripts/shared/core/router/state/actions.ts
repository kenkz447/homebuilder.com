import { Action } from 'redux'

import { INIT_ROUTES } from './keys'

export interface InitRoutesAction extends Action {
    routes: Array<any>
}

export const initRoutes = (routes: Array<any>): InitRoutesAction => ({
    type: INIT_ROUTES,
    routes
})