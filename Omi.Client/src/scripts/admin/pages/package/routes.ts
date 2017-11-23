import { ViewRoute } from 'shared/core'
import { MainRoute } from '../mainRoute'

import { PACKAGE } from '../../settings'

import { PackageNew } from './package-new'
import { PackageIndex } from './package-index'
import { PackageUpdate } from './package-update'

export const Package: ViewRoute = {
    path: '/package',
    name: PACKAGE,
    parent: MainRoute.name
}

export const PackageRoutes = [
    Package,
    PackageIndex,
    PackageNew,
    PackageUpdate
]