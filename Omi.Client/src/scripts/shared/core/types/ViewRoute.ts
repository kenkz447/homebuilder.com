import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { RouteMenuItem } from './RouteMenu'

export interface ViewRoute {
    /**
     * When true, will only match if the path matches the location.pathname exactly.
     * TODO: exact should set to true when the route has children
     */
    exact?: boolean

    /**
     * Any valid URL path that path-to-regexp understands.
     */
    path?: string

    /**
     * A React component to render only when the location matches. It will be rendered with route props.
     */
    component?: React.ComponentType<RouteComponentProps<any> | {}>

    /**
     * Name is unique
     */
    name: string

    /**
     * UI display of route
     */
    defaultLabel?: string

    /**
     * Parent Route's name
     */
    parent?: string

    childRoutes?: Array<ViewRoute>,

    menus?: Array<RouteMenuItem>
}