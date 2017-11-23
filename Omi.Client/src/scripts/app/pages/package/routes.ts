import { ViewRoute } from '../../../shared/core'

import Page from './MainView'

import { ROUTE_NAME } from './keys'

export const packageRoute: ViewRoute = {
    path: '/package/:packageName',
    name: ROUTE_NAME,
    exact: true,
    component: Page
}