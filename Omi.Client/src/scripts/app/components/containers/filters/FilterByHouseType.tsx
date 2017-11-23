import * as React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { push } from 'react-router-redux'
import uuidv1 = require('uuid/v1')

import { ExtractImmutableHOC, RequestSend, SetTempValue } from 'shared/core'
import { TaxonomyViewModel } from 'shared/modules/Modulebase'

import { Dropdown } from '../../components'

interface FilterByDesingThemeDispatchProps {
    initValue?: () => void
    onChange?: (value) => void
}

interface FilterByDesingThemeStateProps {
    allHouseType: Array<TaxonomyViewModel>
    selectedHouseType: number
}

const dropdownKey = uuidv1()

class FilterByHouseTypeComponent extends React.Component<FilterByDesingThemeStateProps & FilterByDesingThemeDispatchProps> {

    componentWillMount() {
        this.props.initValue()
    }

    render() {
        return (
            <div className="filter-design-theme">
                <label className="filter-label">Design Theme</label>
                <Dropdown toggleKey={dropdownKey} label={this.getCurrentHouseTypeLabel()}>
                    <div className="btn-menu">
                    <Button className="btn-menu-link" onClick={() => { this.props.onChange(0) }} disabled={0 == this.props.selectedHouseType}>All</Button>
                    {
                            this.props.allHouseType && this.props.allHouseType.map((o) => (
                                <Button key={o.id} className="btn-menu-link f-dropdown-toggle" disabled={o.id == this.props.selectedHouseType} onClick={(() => {
                                    this.props.onChange(o.id)
                                }).bind(this)}>{o.label}</Button>
                            ))
                        }
                    </div>
                </Dropdown>
            </div>
        )
    }
    getCurrentHouseTypeLabel() {
        if (!this.props.allHouseType || !this.props.selectedHouseType)
            return 'All'

        const selectedHouseType = this.props.allHouseType.find((o) => o.id == this.props.selectedHouseType)
        return selectedHouseType.label
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        allHouseType: state.data.getIn(['allHouseStyle', 'response', 'result']),
        selectedHouseType: state.temp.get('selectedHouseType')
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initValue: () => {
            const currentSearch = new URLSearchParams(location.search)
            const searchHouseType = currentSearch.get('houseType')
            if (searchHouseType)
                dispatch(SetTempValue('selectedHouseType', +searchHouseType))

            const requestSendAction = RequestSend('allHouseStyle', {
                url: '/package/GetHouseStyles'
            })
            dispatch(requestSendAction)
        },
        onChange: (value) => {
            const newURL = new URL(location.href)
            newURL.searchParams.delete('page')
            
            if (!value)
                newURL.searchParams.delete('houseType')
            else
                newURL.searchParams.set('houseType', value)

            newURL.searchParams.set('houseType', value)

            const newURI = `${newURL.pathname}${newURL.search}`
            dispatch(push(newURI))
            dispatch(SetTempValue('selectedHouseType', value))
        }
    }
}

const FilterByHouseTypeComponentWithPureData = ExtractImmutableHOC(FilterByHouseTypeComponent)
export const FilterByHouseType = connect(mapStateToProps, mapDispatchToProps)(FilterByHouseTypeComponentWithPureData)