import { takeEvery } from 'redux-saga/effects'

import { PAGE_CHANGE } from '../../page'

import { WINDOW_CHANGE_WIDTH } from './keys'

import { pageChange, windowWidthChange } from './saga-middlewares'

export function* layoutSagas() {
    yield takeEvery(WINDOW_CHANGE_WIDTH, windowWidthChange)
    yield takeEvery(PAGE_CHANGE, pageChange)
}