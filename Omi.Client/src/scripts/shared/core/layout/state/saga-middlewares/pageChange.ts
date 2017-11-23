import { put } from 'redux-saga/effects'

import { PageChangeAction } from '../../../page'

import { ILayoutTypeChangeAction } from '../actions'
import { LAYOUT_TYPE_CHANGE } from '../keys'

export function* pageChange(action: PageChangeAction) {
    const layoutTypeChangeAction: ILayoutTypeChangeAction = {
        type: LAYOUT_TYPE_CHANGE,
        layoutType: action.pageOptions.layoutType
    }

    yield put(layoutTypeChangeAction)
}