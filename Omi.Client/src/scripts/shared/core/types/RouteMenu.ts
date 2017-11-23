export interface RouteMenuItem {
    /**
     * The name of the menu that you want this route to be present
     */
    menuName: string

    /**
     * Order of the route in the menu
     */
    order?: number

    /**
     * If you want display an icon for this route
     */
    icon?: string

    label?: string

    subMenu?: string
    exact?: boolean
}