import { ViewRoute } from 'shared/core'
import { MainRoute } from '../mainRoute'

import PageComponent from './Page'

import { LOGIN } from './keys'

export const LoginRoute: ViewRoute = {
    path: '/login',
    name: LOGIN,
    exact: true,
    parent: MainRoute.name,
    component: PageComponent
}