import { put } from 'redux-saga/effects'

import { BreakPointSizes, LayoutBreakPoints } from '../../constants'

import { BREAKPOINT_CHANGE } from '../keys'
import { IBreakPointChangeAction, WindowResizeAction } from '../actions'

const getNextBreakPoint = (windowWidth: number): LayoutBreakPoints => {
    for (var i = 0; i < BreakPointSizes.length; i++) {
        const breakPoint = BreakPointSizes[i]
        if (windowWidth >= breakPoint)
            return (<any>LayoutBreakPoints)[breakPoint]
    }
    return LayoutBreakPoints.xs
}

export function* windowWidthChange(action: WindowResizeAction) {
    const nextBreakPoint = yield getNextBreakPoint(action.windowWidth)
    const breakPointChange: IBreakPointChangeAction = {
        type: BREAKPOINT_CHANGE,
        breakPoint: nextBreakPoint
    }
    yield put(breakPointChange)
}