
import { ViewRoute } from '../../../shared/core'
import Page from './Page'
import { packageRoute } from '../package/routes'
export const ProductDetails: ViewRoute = {
    name: 'PRODUCT',
    path: '/product/:product',
    exact: true,
    component: Page,
    parent: packageRoute.name
}