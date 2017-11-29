import { RootState } from 'shared/core'
import { FileEntityInfo } from 'shared/modules/FileAndMedia'

import { TaxonomyViewModel } from 'shared/modules/Modulebase'
import { GeographicaLocationViewModel } from 'shared/modules/Location'

export interface ModuleRootState extends RootState {

}

export interface PackageViewModel {
    id?: number
    title?: string
    sortText?: string
    price?: number
    area?: number
    houseTypeId?: number
    houseTypeLabel?: string
    designThemeId?: number
    designThemeLabel?: string
    avatar?: FileEntityInfo
    pictures?: Array<FileEntityInfo>
    packageIncludedItemIds?: Array<number>
    packageIncludedItems?: Array<TaxonomyViewModel>
    language?: string
    avaliablePackageIncludedItems?: Array<TaxonomyViewModel>
    avaliableDesignThemes?: Array<TaxonomyViewModel>
    avaliableHouseStyles?: Array<TaxonomyViewModel>
}

export interface ProjectBlockViewModel {
    id?: number
    language?: string
    label?: string
    area?: number
    bedRoomCount?: number
    toiletCount?: number
    totalRoomOfLayout?: number
    entityTypeId?: number
    packageId?: number
    parentId?: number
    layoutImage?: FileEntityInfo
    children?: Array<ProjectBlockViewModel>
    layoutPoints?: Array<any>
}

export interface ProjectViewModel {
    projectId?: number,
    Name?: string,
    title?: string
    investor?: string
    street?: string
    website?: string
    language?: string
    totalApartment?: number
    area?: number
    startedYear?: number
    cityId?: number
    city?: GeographicaLocationViewModel
    mapLatitude?: string
    mapLongitude?: string
    projectTypeId?: number
    projectType?: TaxonomyViewModel
    avatar?: FileEntityInfo
    projectBlocks?: Array<ProjectBlockViewModel>
    avaliableProjectTypes?: Array<TaxonomyViewModel>
    avaliableGeographicaLocations?: Array<GeographicaLocationViewModel>
    locationImage?: FileEntityInfo
    siteMapImage?: FileEntityInfo
}