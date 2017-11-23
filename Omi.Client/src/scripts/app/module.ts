import './style.scss'

import { CRModule } from 'shared/core'

import { MAIN_MASTER } from './layout/keys'
import { supportedLanguages } from './settings'
import { HomeRoute } from './pages'

import { MainMaster } from './layout'

export const Module: CRModule = {
    routes: [HomeRoute],
    masterPages: {
        [MAIN_MASTER]: MainMaster,
    },
    supportedLanguages
}