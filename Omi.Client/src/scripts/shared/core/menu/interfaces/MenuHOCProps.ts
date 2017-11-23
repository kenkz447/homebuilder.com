import { Map } from 'immutable'
import { Menu } from '../../types'

interface BaseMenuHOCProps {
    location?: string
}

export interface MenuHOCImmutableProps extends BaseMenuHOCProps {
    menu?: Map<any, any>
}

export interface MenuHOCProps extends BaseMenuHOCProps {
    isSubmenu: boolean
    menu: Menu
    isVertical: boolean
}