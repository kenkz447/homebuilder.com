import './style.scss'

import { CRModule } from 'shared/core'

import { MainRoute, PackageRoutes, ProjectRoutes, ProductRoutes } from './pages'

import { PackageMasterPage, ProjectMasterPage, ProductMasterPage } from './layout' 

import { LAYOUT_PACKAGE_MASTER, LAYOUT_PROJECT_MASTER, PRODUCT_LAYOUT_MASTER } from './settings'
export const Module: CRModule = {
    routes: [MainRoute, ...PackageRoutes, ...ProjectRoutes, ...ProductRoutes],
    masterPages: {
        [LAYOUT_PACKAGE_MASTER]: PackageMasterPage,
        [LAYOUT_PROJECT_MASTER]: ProjectMasterPage,
        [PRODUCT_LAYOUT_MASTER]: ProductMasterPage
    }
}