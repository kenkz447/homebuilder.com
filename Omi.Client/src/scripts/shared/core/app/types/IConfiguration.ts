import { ViewRoute } from '../../types/ViewRoute'
import { Store, LanguageInfo } from '../../types'

import { LayoutCollection } from '../../layout'

export interface IConfiguration {
    baseUrl: string
    routes: Array<ViewRoute>
    reducers: any
    layouts: LayoutCollection
    supportLanguages: Array<LanguageInfo>
    createStore: () => Store
}