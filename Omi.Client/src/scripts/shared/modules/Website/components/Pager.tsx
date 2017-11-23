import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Pagination as AntdPagination, Icon } from 'antd'

import { Pagination } from '../Types'

export const pageItemRender = (baseClassName: string, baseURL: URL, totalPage: number) => (current, type) => {

    const pageURL = baseURL

    if (type === 'prev') {
        pageURL.searchParams.set('page', String(current))
        return <NavLink className={`${baseClassName}-link`} to={`${pageURL.pathname}${pageURL.search}`} onClick={(e) => {
            if (current == 0)
                e.preventDefault()
        }}><Icon type="left" /></NavLink>
    } else if (type === 'next') {
        pageURL.searchParams.set('page', String(current + 1))
        return <NavLink className={`${baseClassName}-link`} to={`${pageURL.pathname}${pageURL.search}`} onClick={(e) => {
            if (current == totalPage)
                e.preventDefault()
        }}><Icon type="right" /></NavLink>
    }

    pageURL.searchParams.set('page', String(current))

    return <NavLink className={`${baseClassName}-link`} to={`${pageURL.pathname}${pageURL.search}`}>{current}</NavLink>
}

export const Pager = (className: string = 'pager') => (props: Pagination) => {
    const baseURL = props.baseURL || new URL(location.href)
    return (
        <div className={className}>
            <AntdPagination
                current={props.pageIndex}
                defaultPageSize={1}
                total={props.totalPage}
                itemRender={pageItemRender(className, baseURL, props.totalPage)}
            />
        </div>
    )
}