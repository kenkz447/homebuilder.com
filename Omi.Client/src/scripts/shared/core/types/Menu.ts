export interface MenuItem {
    path: string,
    label: string,
    icon?: string,
    order?: number,
    subMenu?: Menu,
    exact?: boolean
}

export type Menu = {
    name: string,
    items?: Array<MenuItem>
}