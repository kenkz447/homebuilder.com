import * as React from 'react'
import { Route } from 'react-router'

import { ViewRoute } from '../../types'

/**
 * Render route components
 * @param rootRoute
 */
export const renderRoutes = (routes: Array<ViewRoute>) => {
    return routes.filter((o) => o.component != undefined).map(({ name, path, component, exact }) => (
        <Route key={name} exact={exact} path={path} component={component} />
    ))
}