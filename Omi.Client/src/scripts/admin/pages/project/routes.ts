import { ViewRoute } from 'shared/core'
import { PROJECT } from './../../settings'
import { MainRoute } from '../mainRoute'

import { ProjectIndex } from './project-index'
import { ProjectNew } from './project-new'
import { ProjectUpdate } from './project-update'

export const Project: ViewRoute = {
    path: '/project',
    name: PROJECT,
    parent: MainRoute.name
}

export const ProjectRoutes = [
    Project,
    ProjectIndex,
    ProjectNew,
    ProjectUpdate
]