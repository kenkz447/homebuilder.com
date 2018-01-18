import { ViewRoute } from 'shared/core'

import { BLOG_NEW, BLOG, BLOG_MENU_SIDER } from '../../../settings'

import PageComponent from './Page'

export const BlogNew: ViewRoute = {
    path: '/new',
    name: BLOG_NEW,
    exact: true,
    parent: BLOG,
    component: PageComponent,
    menus: [{
        menuName: BLOG_MENU_SIDER,
        label: 'Create a new',
    }]
}