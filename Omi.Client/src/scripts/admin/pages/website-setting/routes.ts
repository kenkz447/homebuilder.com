import { ViewRoute } from '../../../shared/core'
import { MainRoute } from '../mainRoute'
import { MENU_HEADER } from '../../settings'
import Page from './Page'

export const WebsiteSettingRoute: ViewRoute = {
    path: '/website-setting',
    name: 'ADMIN@ROUTE_WEBSITE_SETTING',
    exact: true,
    component: Page,
    parent: MainRoute.name,
    menus: [
        {
            menuName: MENU_HEADER,
            label: "Website setting"
        }
    ]
}