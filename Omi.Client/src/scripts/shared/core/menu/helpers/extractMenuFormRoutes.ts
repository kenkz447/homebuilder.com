import { ViewRoute, MenuItem, Menu } from '../../types'

import sortBy = require('lodash/sortBy')

export function getMenuItemFromRoute(routes: Array<ViewRoute>, menuName: string) {
    let menuItems: Array<MenuItem> = []

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i]

        if (!route.menus)
            continue

        for (let j = 0; j < route.menus.length; j++) {
            const menu = route.menus[j]

            if (menuName == menu.menuName) {
                const menuItem: MenuItem = {
                    path: route.path,
                    label: menu.label || route.defaultLabel,
                    icon: menu.icon,
                    order: menu.order,
                    exact: menu.exact
                }

                if (menu.subMenu)
                    menuItem.subMenu = extractMenuFormRoutesByName(routes, menu.subMenu)

                menuItems.push(menuItem)
            }
        }
    }

    menuItems = menuItems.sort((item) => item.order)

    return menuItems
}

function getMenuNames(routes: Array<ViewRoute> = []) {
    const menus: Array<string> = []

    for (var i = 0; i < routes.length; i++) {
        const item = routes[i]

        if (item.menus) {
            for (var j = 0; j < item.menus.length; j++) {
                const menu = item.menus[j]
                if (!menus.includes(menu.menuName))
                    menus.push(menu.menuName)
            }
        }
    }

    return menus
}

function extractMenuFormRoutesByName(routes: Array<ViewRoute>, menuName: string) {
    const menu: Menu = {
        name: menuName,
        items: getMenuItemFromRoute(routes, menuName)
    }
    return menu
}

export function extractMenuFormRoutes(routes: Array<ViewRoute>) {
    const orderdRoutes = sortBy(routes, (o) => o.name)

    const menuNames = getMenuNames(orderdRoutes)

    const resultMenus: Array<Menu> = []

    for (const index in menuNames) {
        const menu = menuNames[index]
        resultMenus.push(extractMenuFormRoutesByName(routes, menu))
    }

    return resultMenus
}