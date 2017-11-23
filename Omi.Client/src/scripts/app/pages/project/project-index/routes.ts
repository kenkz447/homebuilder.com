import { ViewRoute } from '../../../../shared/core'
import { WEBSITE_PROJECT } from './../keys'

import Page from './MainView'

import { WEBSITE_PROJECT_INDEX } from './keys'

export const ProjectIndex: ViewRoute = {
    name: WEBSITE_PROJECT_INDEX,
    exact: true,
    component: Page,
    parent: WEBSITE_PROJECT
}