import { ViewRoute } from 'shared/core'

import { PACKAGE_UPDATE, PACKAGE } from '../../../settings'

import PageComponent from './Page'

export const PackageUpdate: ViewRoute = {
    path: '/update',
    name: PACKAGE_UPDATE,
    exact: true,
    parent: PACKAGE,
    component: PageComponent,
}