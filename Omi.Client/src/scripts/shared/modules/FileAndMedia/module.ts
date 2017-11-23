import './style.scss'

import { CRModule } from '../../../shared/core'
import { reducer, sagas } from './state'

export const Module: CRModule = {
    reducers: {
        fileAndMedia: reducer
    },
    middlewares: { sagas }
}