
import { ViewRoute } from '../../../../shared/core'
import { PROJECT_ROOM_LAYOUT } from './../project-room-layout/keys'

import Page from './Page'

import { PROJECT_PACKAGE } from './keys'

export const ProjectPackage: ViewRoute = {
    name: PROJECT_PACKAGE,
    path: '/:packageName',
    exact: true,
    component: Page,
    parent: PROJECT_ROOM_LAYOUT
}