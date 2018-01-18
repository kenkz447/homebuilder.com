import { ViewRoute } from 'shared/core'

import { BLOG_INDEX, BLOG, BLOG_MENU_SIDER, MENU_HEADER } from '../../../settings'

import PageComponent from './Page'

export const BlogIndex: ViewRoute = {
    name: BLOG_INDEX,
    exact: true,
    parent: BLOG,
    component: PageComponent,
    menus: [{
        menuName: MENU_HEADER,
        label: 'Blog',
        exact: false
    }, {
        menuName: BLOG_MENU_SIDER,
        label: 'Blogs',
    }]
}