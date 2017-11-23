import { put, takeEvery } from 'redux-saga/effects'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { openNotificationWithIcon } from '../../utilities'

import { REQUEST_SEND, REQUEST_FAILED } from './keys'
import { RequestResponse, RequestSendAction, RequestFailedAction, RequestFailed } from './actions'

function* onFetchFailed(action: RequestFailedAction) {
    openNotificationWithIcon('error', {title: 'System', description: action.error})
}

function* onRequestSend(action: RequestSendAction) {
    try {
        yield put(showLoading())
        const response = yield fetch(action.url, action.requestInit)
        const requestResponseAction = RequestResponse(action.dataKey, yield response.json())
        yield put(requestResponseAction)
    } catch (error) {
        yield put(RequestFailed(action.dataKey, error.message))
    }
    finally {
        yield put(hideLoading())
    }
}

export function* dataSagas() {
    yield takeEvery(REQUEST_SEND, onRequestSend)
    yield takeEvery(REQUEST_FAILED, onFetchFailed)
}