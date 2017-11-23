import { Action } from 'redux'

import { LayoutBreakPoints } from '../constants'
import { WINDOW_CHANGE_WIDTH } from './keys'
export interface WindowResizeAction extends Action {
    windowWidth: number
}

export const windowResize = (windowWidth: number): WindowResizeAction => ({
    type: WINDOW_CHANGE_WIDTH,
    windowWidth
})

export interface IBreakPointChangeAction extends Action {
    breakPoint: LayoutBreakPoints
}

export interface ILayoutTypeChangeAction extends Action {
    layoutType: number
}