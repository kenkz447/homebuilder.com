import * as React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { push } from 'react-router-redux'
import uuidv1 = require('uuid/v1')

import { ExtractImmutableHOC, RequestSend, SetTempValue } from '../../../../../../shared/core'
import { TaxonomyViewModel } from '../../../../../../shared/modules/Modulebase'

import { Dropdown } from '../../../../../components'

interface DispatchProps {
    initValue?: () => void
    onChange?: (value) => void
}

interface StateProps {
    allCity: Array<TaxonomyViewModel>
    selectedCity: string
}

const dropdownKey = uuidv1()

class Component extends React.Component<StateProps & DispatchProps> {
    componentWillMount() {
        this.props.initValue()
    }

    render() {
        return (
            <div className="filter">
                <label className="filter-label">Location</label>
                <Dropdown toggleKey={dropdownKey} label={this.getActiveLabel()}>
                    <div className="btn-menu">
                    <Button className="btn-menu-link" onClick={() => { this.props.onChange(0) }} disabled={!this.props.selectedCity}>All</Button>
                    {
                            this.props.allCity && this.props.allCity.map((o) => (
                                <Button key={o.id} className="btn-menu-link f-dropdown-toggle" disabled={o.name == this.props.selectedCity} onClick={(() => {
                                    this.props.onChange(o.name)
                                }).bind(this)}>{o.label}</Button>
                            ))
                        }
                    </div>
                </Dropdown>
            </div>
        )
    }
    getActiveLabel() {
        if (!this.props.allCity || !this.props.selectedCity)
            return 'All'

        const selectedCity = this.props.allCity.find((o) => o.name == this.props.selectedCity)
        return selectedCity.label
    }
}

const mapStateToProps = (state, ownProps): StateProps => {
    return {
        allCity: state.data.getIn(['allCity', 'response', 'result']),
        selectedCity: state.temp.get('selectedCity')
    }
}

const mapDispatchToProps = (dispatch, ownProps): DispatchProps => {
    return {
        initValue: () => {
            const currentSearch = new URLSearchParams(location.search)
            const searchCity = currentSearch.get('city')
            if (searchCity)
                dispatch(SetTempValue('selectedCity', searchCity))

            const requestSendAction = RequestSend('allCity', {
                url: '/project/getAllCity'
            })
            dispatch(requestSendAction)
        },
        onChange: (value) => {
            const newURL = new URL(location.href)
            newURL.searchParams.delete('page')
            
            if (!value)
                newURL.searchParams.delete('city')
            else
                newURL.searchParams.set('city', value)

            const newURI = `${newURL.pathname}${newURL.search}`
            dispatch(push(newURI))
            dispatch(SetTempValue('selectedCity', value))
        }
    }
}

const ComponentWithPureData = ExtractImmutableHOC(Component)
export const FilterByCity = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ComponentWithPureData)