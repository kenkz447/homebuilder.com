import { List, Map } from 'immutable'

export interface ReducerRootState {
    router
    routes
    menus
    layout
    page
    data
    temp
    localization
}

export interface RootState extends ReducerRootState {
    router: {
        location: any
    }
    routes: Map<string, any>
    menus: List<Map<any, any>>
    layout: Map<string, any>
    page: Map<string, any>
    data: Map<string, any>
    temp: Map<string, any>
    localization: Map<string, any>
}