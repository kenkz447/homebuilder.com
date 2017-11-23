import { ViewRoute } from 'shared/core'
import { MainRoute } from '../mainRoute'

import PageComponent from './Page'

import { PAGE } from './keys'

export const RegisterRoute: ViewRoute = {
    path: '/register',
    name: PAGE,
    exact: true,
    parent: MainRoute.name,
    component: PageComponent
}