import { Action } from 'redux'

import { Menu } from '../../types'

import { INIT_MENU } from './keys'

export interface InitMenuAction extends Action {
    menuCollection: Array<Menu>
}

export const initMenu = (menuCollection: Array<Menu>): InitMenuAction => ({
    type: INIT_MENU,
    menuCollection
})