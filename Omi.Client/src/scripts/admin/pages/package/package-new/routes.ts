import { ViewRoute } from 'shared/core'

import { PACKAGE_NEW, PACKAGE, PACKAGE_MENU_SIDER } from '../../../settings'

import PageComponent from './Page'

export const PackageNew: ViewRoute = {
    path: '/new',
    name: PACKAGE_NEW,
    exact: true,
    parent: PACKAGE,
    component: PageComponent,
    menus: [{
        menuName: PACKAGE_MENU_SIDER,
        label: 'Create a new',
    }]
}