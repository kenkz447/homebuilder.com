import { ViewRoute } from 'shared/core'

import { PRODUCT_NEW, PRODUCT, PRODUCT_MENU_SIDER } from '../../../settings'

import PageComponent from './Page'

export const ProductNew: ViewRoute = {
    path: '/new',
    name: PRODUCT_NEW,
    exact: true,
    parent: PRODUCT,
    component: PageComponent,
    menus: [{
        menuName: PRODUCT_MENU_SIDER,
        label: 'Create a new',
    }]
}