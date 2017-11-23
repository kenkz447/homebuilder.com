import { initRoutes } from '../router'
import { initMenu, extractMenuFormRoutes } from '../menu'

import { initLayout } from '../layout'
import { completeRouteData } from '../router/helpers'
import { setLanguages } from '../localization/languages'
import { IConfiguration } from './types/IConfiguration'

export const AppInit = (configuration: IConfiguration) => {
    const { createStore, routes, reducers, layouts } = configuration

    initLayout(layouts)
    setLanguages(configuration.supportLanguages)
    
    // Complementary routes data
    const baseRoutes = completeRouteData(routes)
    const langRoutes = []

    for (const lang of configuration.supportLanguages) {
        if (lang.isPrimary)
            continue
        for (const route of baseRoutes) {
            const langRoute = Object.assign({}, route)
            langRoute.path = langRoute.path.replace('/', `/${lang.code}/`)
            langRoute.name = `${lang.code.toUpperCase()}:${langRoute.name}`
            if (langRoute.parent)
                langRoute.parent = `${lang.code.toUpperCase()}:${langRoute.parent}`
            langRoutes.push(langRoute)
        }
    }
    const appRoutes = baseRoutes.concat(langRoutes)

    const store = createStore()

    // Initial routes
    store.dispatch(initRoutes(appRoutes))

    // Initial menu
    const menuCollection = extractMenuFormRoutes(routes)
    store.dispatch(initMenu(menuCollection))

    // Render your app when all done
    require('./run')['default'](store, reducers)
}