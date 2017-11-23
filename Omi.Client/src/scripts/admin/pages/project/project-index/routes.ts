import { ViewRoute } from 'shared/core'

import { PROJECT_INDEX, PROJECT, PROJECT_MENU_SIDER, MENU_HEADER } from '../../../settings'

import PageComponent from './Page'

export const ProjectIndex: ViewRoute = {
    name: PROJECT_INDEX,
    exact: true,
    parent: PROJECT,
    component: PageComponent,
    menus: [{
        menuName: MENU_HEADER,
        label: 'Project',
        exact: false
    }, {
        menuName: PROJECT_MENU_SIDER,
        label: 'Projects',
    }]
}