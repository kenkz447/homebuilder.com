import { ViewRoute } from '../../../shared/core'

import { WEBSITE_PROJECT } from './keys'
import { ProjectIndex } from './project-index'
import { ProjectDetail } from './project-detail'

const Project: ViewRoute = {
    path: '/project',
    name: WEBSITE_PROJECT,
}
export const ProjectRoutes = [
    Project,
    ProjectIndex,
    ProjectDetail
]