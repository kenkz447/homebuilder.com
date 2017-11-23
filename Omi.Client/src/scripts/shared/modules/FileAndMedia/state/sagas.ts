import { put, takeEvery } from 'redux-saga/effects'

import { GetFetchFilesAction  } from '../settings'

import { MODAL_OPEN, SET_CHECKED_FILES } from './actions'

/**
 * Fetch files when modal open
 * @param action 
 */
function* modalOpenSaga(action) {
    const fileFetchAction = GetFetchFilesAction()
    yield put(fileFetchAction)
}

export function* sagas() {
    yield takeEvery(MODAL_OPEN, modalOpenSaga)
}