import { ViewRoute } from './ViewRoute'
import { LayoutCollection } from '../layout'
import { LanguageInfo } from '../index'
export interface ModuleMiddlewares {
    sagas?: () => void,
    epic?: any,
    thunk?: any
}

export interface CRModule {
    routes?: Array<ViewRoute>
    middlewares?: ModuleMiddlewares
    reducers?: {
        [name: string]: (state, action) => void
    }
    masterPages?: LayoutCollection
    supportedLanguages?: Array<LanguageInfo>
}