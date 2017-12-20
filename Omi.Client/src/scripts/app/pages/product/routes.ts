
import { ViewRoute } from '../../../shared/core'
import Page from './Page'
import { ProjectPackage } from '../project/project-package'
export const ProductDetails: ViewRoute = {
    name: 'PRODUCT',
    path: '/:product',
    exact: true,
    component: Page,
    parent: ProjectPackage.name
}