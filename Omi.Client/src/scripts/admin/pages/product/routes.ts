import { ViewRoute } from 'shared/core'
import { MainRoute } from '../mainRoute'

import { PRODUCT } from '../../settings'

import { ProductNew } from './product-new'
import { ProductIndex } from './product-index'
import { ProductUpdate } from './product-update'

export const Product: ViewRoute = {
    path: '/product',
    name: PRODUCT,
    parent: MainRoute.name
}

export const ProductRoutes = [
    Product,
    ProductIndex,
    ProductNew,
    ProductUpdate
]