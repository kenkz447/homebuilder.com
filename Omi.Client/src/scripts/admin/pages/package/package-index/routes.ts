import { ViewRoute } from 'shared/core'

import { PACKAGE_INDEX, PACKAGE, PACKAGE_MENU_SIDER, MENU_HEADER } from '../../../settings'

import PageComponent from './Page'

export const PackageIndex: ViewRoute = {
    name: PACKAGE_INDEX,
    exact: true,
    parent: PACKAGE,
    component: PageComponent,
    menus: [{
        menuName: MENU_HEADER,
        label: 'Package',
        exact: false
    }, {
        menuName: PACKAGE_MENU_SIDER,
        label: 'Packages',
    }]
}