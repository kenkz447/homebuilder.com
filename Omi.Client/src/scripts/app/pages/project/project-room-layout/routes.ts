
import { ViewRoute } from '../../../../shared/core'
import { WEBSITE_PROJECT_DETAIL } from './../project-detail/keys'

import Page from './Page'

import { PROJECT_ROOM_LAYOUT } from './keys'

export const ProjectRoomLayoutDetail: ViewRoute = {
    name: PROJECT_ROOM_LAYOUT,
    path: '/:roomType/:layout',
    exact: true,
    component: Page,
    parent: WEBSITE_PROJECT_DETAIL
}