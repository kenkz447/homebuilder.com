import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Button, Slider } from 'antd'
import { SliderValue } from 'antd/lib/slider'

import difference = require('lodash/difference')

import uuidv1 = require('uuid/v1')

import { ExtractImmutableHOC, SetTempValue } from 'shared/core'
import { toCurrency } from 'shared/modules/website'
import { WebsiteRootState } from '../../../Types'

import { Dropdown } from '../../components'

interface DispatchProps {
    onApplyFilter: (min, max) => void
    onMinValueChange: (value: number) => void
    onMaxValueChange: (value: number) => void
}

interface StateProps {
    value?: SliderValue
    defaultMinValue?: number
    defaultMaxValue?: number
}

const dropdownKey = uuidv1()

class FilterByBudgetRangeComponent extends React.Component<DispatchProps & StateProps> {
    componentWillMount() {
        const currentMin = this.props.value[0]
        const currentMax = this.props.value[1]
        
        const searchMinMax = this.getSearchMinMax()

        if (searchMinMax[0] && (currentMin != searchMinMax[0]))
            this.props.onMinValueChange(searchMinMax[0])

        if (searchMinMax[1] && (currentMax != searchMinMax[1]))
            this.props.onMaxValueChange(searchMinMax[1])

    }

    render() {
        const currentMin = this.props.value[0]
        const currentMax = this.props.value[1]

        const searchMinMax = this.getSearchMinMax()
        
        const budgetMinCurrency = toCurrency(searchMinMax[0] || this.props.defaultMinValue)
        const budgetMaxCurrency = toCurrency(searchMinMax[1] || this.props.defaultMaxValue)

        return (
            <div className="filter-budget-range">
                <label className="filter-label">Budget Range</label>
                <Dropdown label={`${budgetMinCurrency} - ${budgetMaxCurrency}`} toggleKey={dropdownKey}>
                    <Slider range step={1000000} tipFormatter={toCurrency} min={this.props.defaultMinValue} max={this.props.defaultMaxValue} defaultValue={[currentMin, currentMax]} onChange={(value) => {
                        this.props.onMinValueChange(value[0])
                        this.props.onMaxValueChange(value[1])
                    }} />
                    <div className="text-center">
                        <Button onClick={() => { this.props.onApplyFilter(currentMin, currentMax) }}>Apply filter</Button>
                    </div>
                </Dropdown>
            </div>
        )
    }

    getSearchMinMax() {
        const currentUrl = new URL(location.href)
        const searchBudgetMin = +currentUrl.searchParams.get('budgetMin')
        const searchBudgetMax = +currentUrl.searchParams.get('budgetMax')

        return [searchBudgetMin, searchBudgetMax]
    }
}

const mapStateToProps = (state: WebsiteRootState, ownProps): StateProps => {
    const min = 0
    const max = 200000000

    const currentMin = state.temp.get('budgetMin') || min
    const currentMax = state.temp.get('budgetMax') || max

    return {
        value: [
            currentMin,
            currentMax
        ],
        defaultMinValue: min,
        defaultMaxValue: max
    }
}

const mapDispatchToProps = (dispatch, ownProps): DispatchProps => {
    return {
        onMinValueChange: (nextValue: SliderValue) => {
            dispatch(SetTempValue('budgetMin', nextValue))
        },
        onMaxValueChange: (nextValue) => {
            dispatch(SetTempValue('budgetMax', nextValue))
        },
        onApplyFilter: (min: number, max: number) => {
            const newURL = new URL(location.href)
            newURL.searchParams.set('budgetMin', String(min))
            newURL.searchParams.set('budgetMax', String(max))
            newURL.searchParams.delete('page')
            
            const newURI = `${newURL.pathname}${newURL.search}`

            dispatch(push(newURI))
        }
    }
}

export const FilterByBudgetRange = connect(mapStateToProps, mapDispatchToProps)(FilterByBudgetRangeComponent)