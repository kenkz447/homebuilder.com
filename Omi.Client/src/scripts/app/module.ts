import './style.scss'

import { CRModule } from 'shared/core'

import { MAIN_MASTER } from './layout/keys'
import { supportedLanguages } from './settings'
import {
    homeRoute as Home,
    packageRoute as Package,
    ProjectRoutes,
    ProductDetails
} from './pages'

import { MainMaster } from './layout'

export const Module: CRModule = {
    routes: [ Home, Package, ...ProjectRoutes, ProductDetails],
    masterPages: {
        [MAIN_MASTER]: MainMaster,
    },
    supportedLanguages
}