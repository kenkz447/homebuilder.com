import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'

import { LOCATION_CHANGE } from 'react-router-redux'
import { ChangeCurrentLanguage } from './actions'
import { getLanguages } from '../languages'

function* locationChange(action) {
    const languages = getLanguages()
    for (const lang of languages) {
        if (lang.isPrimary)
            continue

        if (String(action.payload.pathname).startsWith(`/${lang.code}`)) {
            yield put(ChangeCurrentLanguage({ language: lang }))
            return
        }
    }
}

export function* localizationSagas() {
    yield takeEvery(LOCATION_CHANGE, locationChange)
}