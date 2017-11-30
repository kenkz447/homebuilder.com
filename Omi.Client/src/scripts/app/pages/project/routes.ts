import { ViewRoute } from '../../../shared/core'

import { WEBSITE_PROJECT } from './keys'
import { ProjectIndex } from './project-index'
import { ProjectDetail } from './project-detail'
import { ProjectRoomLayoutDetail } from './project-room-layout'
import { ProjectPackage } from './project-package'

const Project: ViewRoute = {
    path: '/project',
    name: WEBSITE_PROJECT,
}
export const ProjectRoutes = [
    Project,
    ProjectIndex,
    ProjectDetail,
    ProjectRoomLayoutDetail,
    ProjectPackage
]