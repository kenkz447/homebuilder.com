
import { ComponentType } from 'react'
import { LanguageInfo } from '../types'

let Languages: Array<LanguageInfo> = []

export const setLanguages = (languageCollection: Array<LanguageInfo>) => {
    Languages = languageCollection
}

export const getLanguages = () => Languages