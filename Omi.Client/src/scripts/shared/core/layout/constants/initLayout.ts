
import { ComponentType } from 'react'

export type LayoutCollection = {
    [name: string]: ComponentType
}

let Layouts: LayoutCollection = {}

export const initLayout = (layoutCollection: LayoutCollection) => {
    Layouts = layoutCollection
}

export const getLayouts = (layout: string) => Layouts[layout]
