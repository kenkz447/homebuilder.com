import './style.scss'

import { ViewRoute } from '../../../../shared/core'
import { WEBSITE_PROJECT } from './../keys'

import Page from './MainView'

import { WEBSITE_PROJECT_DETAIL } from './keys'

export const ProjectDetail: ViewRoute = {
    name: WEBSITE_PROJECT_DETAIL,
    path: '/:project',
    exact: true,
    component: Page,
    parent: WEBSITE_PROJECT
}