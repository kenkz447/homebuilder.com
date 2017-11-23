export interface MapMarkerViewModel {
    Long?: string
    Lat?: string
    Zoom?: number
}

export interface GeographicaLocationViewModel {
    id?: number
    name?: string
    label?: string
    marker?: MapMarkerViewModel
}