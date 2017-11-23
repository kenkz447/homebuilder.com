import { CRModule } from 'shared/core'

import { MainRoute, LoginRoute, RegisterRoute } from './pages'
import { Blank } from './layout'
import { LAYOUT_BLANK } from './settings'
export const Module: CRModule = {
    routes: [MainRoute, LoginRoute, RegisterRoute],
    masterPages: {
        [LAYOUT_BLANK]: Blank,
    }
}