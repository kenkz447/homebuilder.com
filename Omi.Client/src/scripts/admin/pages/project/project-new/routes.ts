import { ViewRoute } from 'shared/core'

import { PROJECT_NEW, PROJECT, PROJECT_MENU_SIDER } from '../../../settings'

import PageComponent from './Page'

export const ProjectNew: ViewRoute = {
    path: '/new',
    name: PROJECT_NEW,
    exact: true,
    parent: PROJECT,
    component: PageComponent,
    menus: [{
        menuName: PROJECT_MENU_SIDER,
        label: 'Create a new',
    }]
}