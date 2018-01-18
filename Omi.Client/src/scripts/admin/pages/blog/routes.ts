import { ViewRoute } from 'shared/core'
import { MainRoute } from '../mainRoute'

import { BLOG } from '../../settings'

import { BlogNew } from './blog-new'
import { BlogIndex } from './blog-index'
import { BlogUpdate } from './blog-update'

export const Blog: ViewRoute = {
    path: '/blog',
    name: BLOG,
    parent: MainRoute.name
}

export const BlogRoutes = [
    Blog,
    BlogIndex,
    BlogNew,
    BlogUpdate
]