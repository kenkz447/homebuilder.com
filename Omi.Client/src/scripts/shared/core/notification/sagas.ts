import { takeEvery } from 'redux-saga'
import { openNotificationWithIcon } from '../utilities'
import { SHOW_NOTIFY, ShowNotificationAction } from './actions'

function* onShow(action: ShowNotificationAction) {
    openNotificationWithIcon('success', action.display)
}

export function* notificationSagas() {
    yield takeEvery(SHOW_NOTIFY, onShow)
}