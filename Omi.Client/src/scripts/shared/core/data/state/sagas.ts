import { put, takeEvery } from 'redux-saga/effects'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { openNotificationWithIcon } from '../../utilities'

import { REQUEST_SEND, REQUEST_FAILED } from './keys'
import { RequestResponse, RequestSendAction, RequestFailedAction, RequestFailed } from './actions'
import { push } from 'react-router-redux'

function* onFetchFailed(action: RequestFailedAction) {
    openNotificationWithIcon('error', { title: 'System', description: action.error })
}

function* onRequestSend(action: RequestSendAction) {
    try {
        yield put(showLoading())
        const response = yield fetch(action.url, action.requestInit)
        if (response.redirected) {
            const redirectUrl = new URL(response.url)
            redirectUrl.searchParams.set('returnUrl', location.pathname)
            location.href = `${redirectUrl.pathname}${redirectUrl.search}`
            return
        }
        else {
            let responseValue = yield response.text()
            if (responseValue)
                responseValue = JSON.parse(responseValue)
            
            const requestResponseAction = RequestResponse(action.dataKey, responseValue)
            yield put(requestResponseAction)
            if (action.callbacks) {
                action.callbacks.sucess && action.callbacks.sucess(responseValue)
            }
        }
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