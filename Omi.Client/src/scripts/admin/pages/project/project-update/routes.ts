import { ViewRoute } from 'shared/core'

import { PROJECT_UPDATE, PROJECT, PROJECT_MENU_SIDER } from '../../../settings'

import PageComponent from './Page'

export const ProjectUpdate: ViewRoute = {
    path: '/update',
    name: PROJECT_UPDATE,
    exact: true,
    parent: PROJECT,
    component: PageComponent
}