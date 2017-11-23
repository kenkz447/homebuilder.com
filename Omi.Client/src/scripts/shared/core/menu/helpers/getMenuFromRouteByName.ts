import { fromJS, List } from 'immutable'
import { ViewRoute, MenuItem } from '../../types'

export function getMenuItemFromRouteByName(routes: Array<ViewRoute>, menuName: string) {
    let menuItems = []

    for (var i = 0; i < routes.length; i++) {
        const route = routes[i]
        
        if (!route.menus)
            continue

        for (var j = 0; j < route.menus.length; j++) {
            const menu = route.menus[j]

            if (menuName == menu.menuName) {
                const menuItem: MenuItem = {
                    path: route.path,
                    label: route.defaultLabel,
                    icon: menu.icon,
                    order: menu.order
                }
                menuItems.push(menuItem)
            }
        }
    }

    menuItems = menuItems.sort((item) => item.order)

    return fromJS(menuItems) as List<MenuItem>
}