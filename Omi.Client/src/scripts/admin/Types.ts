import { RootState } from 'shared/core'
import { FileEntityInfo } from 'shared/modules/FileAndMedia'

import { TaxonomyViewModel } from 'shared/modules/Modulebase'
import { GeographicaLocationViewModel } from 'shared/modules/Location'

export interface ModuleRootState extends RootState {
}

export interface BlogViewModel {
    id?: number
    name?: string
    title?: string
    description?: string
    content?: string
    avatar?: FileEntityInfo
    pictures: Array<FileEntityInfo>

    tags: Array<string>
}

export interface ProductViewModel {
    entityId?: number
    name?: string
    title?: string
    code?: string
    description?: string
    dimension?: string
    price?: number
    brandId?: number
    brand?: TaxonomyViewModel
    typeId?: number
    type?: TaxonomyViewModel
    avatar?: FileEntityInfo
    pictures: Array<FileEntityInfo>
    avaliableBrands?: Array<TaxonomyViewModel>
    avaliableProductTypes?: Array<TaxonomyViewModel>
}

export interface PackageProductViewModel {
    productId?: number
    quantity?: number
    productViewModel?: ProductViewModel
}

export interface PackageViewModel {
    id?: number
    projectBlockId?: number
    isPerspective?: boolean
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
    packageFurnitureIncludedItemIds?: Array<number>
    packageIncludedItems?: Array<TaxonomyViewModel>
    packageFurnitureIncludedItems?: Array<TaxonomyViewModel>
    avaliablePackageIncludedItems?: Array<TaxonomyViewModel>
    avaliablePackageFurnitureIncludedItems?: Array<TaxonomyViewModel>
    avaliableDesignThemes?: Array<TaxonomyViewModel>
    avaliableHouseStyles?: Array<TaxonomyViewModel>
    products?: Array<PackageProductViewModel>
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
    name?: string
    budgetMin?: number
    budgetMax?: number
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
export interface SettingValueViewModel {
    id: number,
    name: string,
    value: any
}

export interface WebsiteSettingFormValue {
    siteTitle?: SettingValueViewModel
    siteDescription?: SettingValueViewModel
    companyName?: SettingValueViewModel
    companyLogo?: SettingValueViewModel
    companyAddress?: SettingValueViewModel
    socialNetworks?: SettingValueViewModel
    contactBannerImage?: SettingValueViewModel
    contactWelcomeHtml?: SettingValueViewModel
    contactInfoHtml?: SettingValueViewModel
    contactSendToEmail?: SettingValueViewModel
    contactSendFromEmail?: SettingValueViewModel
    contactSendFromEmailPassword?: SettingValueViewModel
    contactMapLatitude?: SettingValueViewModel
    contactMapLongitude?: SettingValueViewModel
}
