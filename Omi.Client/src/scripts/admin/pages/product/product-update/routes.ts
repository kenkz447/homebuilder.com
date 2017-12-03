import { ViewRoute } from 'shared/core'

import { PRODUCT_UPDATE, PRODUCT } from '../../../settings'

import PageComponent from './Page'

export const ProductUpdate: ViewRoute = {
    path: '/update',
    name: PRODUCT_UPDATE,
    exact: true,
    parent: PRODUCT,
    component: PageComponent,
}