interface PageOnloadEvent {
    dispatch: (action) => void
}

export interface PageOption {
    pageKey: string
    pageTitle?: string
    layoutType?: any
    onload?: (e: PageOnloadEvent) => void
}