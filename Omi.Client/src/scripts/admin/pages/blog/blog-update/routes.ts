import { ViewRoute } from 'shared/core'

import { BLOG_UPDATE, BLOG } from '../../../settings'

import PageComponent from './Page'

export const BlogUpdate: ViewRoute = {
    path: '/update',
    name: BLOG_UPDATE,
    exact: true,
    parent: BLOG,
    component: PageComponent,
}