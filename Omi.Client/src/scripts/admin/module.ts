import './style.scss'

import { CRModule } from 'shared/core'

import { MainRoute, PackageRoutes, ProjectRoutes } from './pages'

import { PackageMasterPage, ProjectMasterPage } from './layout' 

import { LAYOUT_PACKAGE_MASTER, LAYOUT_PROJECT_MASTER } from './settings'
export const Module: CRModule = {
    routes: [MainRoute, ...PackageRoutes, ...ProjectRoutes],
    masterPages: {
        [LAYOUT_PACKAGE_MASTER]: PackageMasterPage,
        [LAYOUT_PROJECT_MASTER]: ProjectMasterPage
    }
}