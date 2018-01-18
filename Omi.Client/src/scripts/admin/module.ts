import './style.scss'

import { CRModule } from 'shared/core'

import { MainRoute, PackageRoutes, ProjectRoutes, ProductRoutes, WebsiteSettingRoute, BlogRoutes } from './pages'

import { PackageMasterPage, ProjectMasterPage, ProductMasterPage, BaseMasterPage, BlogMasterPage } from './layout'

import { LAYOUT_PACKAGE_MASTER, LAYOUT_PROJECT_MASTER, PRODUCT_LAYOUT_MASTER, BASE_MASTER, BLOG_LAYOUT_MASTER } from './settings'
export const Module: CRModule = {

    routes: [MainRoute, ...PackageRoutes, ...ProjectRoutes, ...ProductRoutes, WebsiteSettingRoute, ...BlogRoutes],
    masterPages: {
        [BASE_MASTER]: BaseMasterPage,
        [LAYOUT_PACKAGE_MASTER]: PackageMasterPage,
        [LAYOUT_PROJECT_MASTER]: ProjectMasterPage,
        [PRODUCT_LAYOUT_MASTER]: ProductMasterPage,
        [BLOG_LAYOUT_MASTER]: BlogMasterPage
    }
}