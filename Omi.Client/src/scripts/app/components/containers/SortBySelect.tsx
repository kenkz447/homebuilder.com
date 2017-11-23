import * as React from 'react'
import { push } from 'react-router-redux'

import { connect } from 'react-redux'
import { Button } from 'antd'
import map = require('lodash/map')
import uuidv1 = require('uuid/v1')

import { ExtractImmutableHOC, SetTempValue } from 'shared/core'
import { WebsiteRootState } from '../../Types'
import { Dropdown } from '../components'

interface SortBySelectDispathProps {
    onChange?: (orderBy) => void,
}
interface SortBySelectStateProps {
    searchs?: string,
}
interface SortBySelectProps extends SortBySelectDispathProps, SortBySelectStateProps {
    
} 

const defaultSortBy = 'recommended'
const templates = {
    [defaultSortBy]: 'Recommended',
    'most-recent': 'Most Recent',
    'trending': 'Trending',
    'most-viewed': 'Most Viewed',
    'most-saved': 'Most Saved',
    'price-asc': 'Prince Asc'
}
const dropdownKey = uuidv1()

const SortBySelectComponent = (props: SortBySelectProps) => {
    const searchParams = new URLSearchParams(props.searchs)
    let currentSortBy = searchParams.get('sortBy')
    if (!currentSortBy)
        currentSortBy = defaultSortBy

    return (
        <div className="filter-sortby">
            <label className="filter-label">Sort by</label>
            <Dropdown toggleKey={dropdownKey} label={templates[currentSortBy]}>
                <div className="btn-menu">
                    {
                        map(templates, (value, key) => (
                            <Button key={key} className="btn-menu-link f-dropdown-toggle" onClick={() => { props.onChange(key) }}>{value}</Button>)
                        )
                    }
                </div>
            </Dropdown>
        </div>
    )
}

const mapStateToProps = (state: WebsiteRootState, ownProps: SortBySelectProps): SortBySelectStateProps => {
    return {
        searchs: state.router.location.search
    }
}

const mapDispatchToProps = (dispatch, ownProps: SortBySelectProps): SortBySelectDispathProps => {
    return {
        onChange: (orderBy) => {
            const newURL = new URL(location.href)
            newURL.searchParams.set('sortBy', orderBy)

            const newURI = `${newURL.pathname}${newURL.search}`
            dispatch(push(newURI))
        }
    }
}

export const SortBySelect = connect(mapStateToProps, mapDispatchToProps)(SortBySelectComponent)