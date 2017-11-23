import { ViewRoute } from 'shared/core'

import IndexComponent from './Page'

import { ROUTE_NAME } from './keys'

export const HomeRoute: ViewRoute = {
    path: '/',
    name: ROUTE_NAME,
    exact: true,
    component: IndexComponent
}