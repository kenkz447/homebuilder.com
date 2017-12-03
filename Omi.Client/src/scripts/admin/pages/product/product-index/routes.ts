import { ViewRoute } from 'shared/core'

import { PRODUCT_INDEX, PRODUCT, PRODUCT_MENU_SIDER, MENU_HEADER } from '../../../settings'

import PageComponent from './Page'

export const ProductIndex: ViewRoute = {
    name: PRODUCT_INDEX,
    exact: true,
    parent: PRODUCT,
    component: PageComponent,
    menus: [{
        menuName: MENU_HEADER,
        label: 'Product',
        exact: false
    }, {
        menuName: PRODUCT_MENU_SIDER,
        label: 'Products',
    }]
}