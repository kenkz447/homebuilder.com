import { ViewRoute } from '../../../shared/core'

import Page from './Page'
import { ROUTE_NAME } from './keys'

export const ContactRoute: ViewRoute = {
    path: '/contact',
    name: ROUTE_NAME,
    exact: true,
    component: Page
}