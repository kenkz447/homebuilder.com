export interface Pagination {
    totalPage: number
    pageIndex: number
    pageSize: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    baseURL: URL
}

export interface PageEntityViewModel<TEntity> {
    entities: Array<TEntity>
    pager: Pagination
}

export interface SettingValueViewModel {
    id: number,
    name: string,
    value: any
}