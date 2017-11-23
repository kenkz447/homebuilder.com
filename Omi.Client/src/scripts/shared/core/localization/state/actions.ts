import { LanguageInfo } from "../../types"

export const CHANGE_CURRENT_LANGUAGE = 'LOCALIZATION@CHANGE_CURRENT_LANGUAGE'
export const ADD_RESOURCE = 'LOCALIZATION@ADD_RESOURCE'

export interface ChangeCurrentLanguageAction {
    language: LanguageInfo
}

export const ChangeCurrentLanguage = (payload: ChangeCurrentLanguageAction) => ({
    type: CHANGE_CURRENT_LANGUAGE,
    ...payload
})