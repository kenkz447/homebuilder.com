import * as React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import uuidv1 = require('uuid/v1')
import { push } from 'react-router-redux'

import { ExtractImmutableHOC, RequestSend, SetTempValue } from 'shared/core'
import { Dropdown } from '../../components'
import { WebsiteRootState } from '../../../Types'
import { TaxonomyViewModel } from 'shared/modules/Modulebase'

interface DispatchProps {
    initValue?: () => void
    onChange?: (value) => void
}

interface StateProps {
    allDesignTheme: Array<TaxonomyViewModel>,
    selectedDesignTheme: number
}

const dropdownKey = uuidv1()

class FilterByDesingThemeComponent extends React.Component<StateProps & DispatchProps> {

    componentWillMount() {
        this.props.initValue()
    }

    render() {
        return (
            <div className="filter-design-theme">
                <label className="filter-label">Design Theme</label>
                <Dropdown toggleKey={dropdownKey} label={this.getCurrentDesignThemeLabel()}>
                    <div className="btn-menu">
                        <Button className="btn-menu-link" disabled={0 == this.props.selectedDesignTheme} onClick={() => { this.props.onChange(0) }} >All</Button>
                        {
                            this.props.allDesignTheme && this.props.allDesignTheme.map((o) => (
                                <Button key={o.id} className="btn-menu-link f-dropdown-toggle" disabled={o.id == this.props.selectedDesignTheme} onClick={(() => {
                                    this.props.onChange(o.id)
                                }).bind(this)} >{o.label}</Button>
                            ))
                        }
                    </div>
                </Dropdown>
            </div>
        )
    }

    getCurrentDesignThemeLabel() {
        if (!this.props.allDesignTheme || !this.props.selectedDesignTheme)
            return 'All'

        const selectedDesignTheme = this.props.allDesignTheme.find((o) => o.id == this.props.selectedDesignTheme)
        return selectedDesignTheme.label
    }
}

const mapStateToProps = (state: WebsiteRootState, ownProps): StateProps => {
    return {
        allDesignTheme: state.data.getIn(['allDesignTheme', 'response', 'result']),
        selectedDesignTheme: state.temp.get('selectedDesignTheme')
    }
}

const mapDispatchToProps = (dispatch, ownProps): DispatchProps => {
    return {
        initValue: () => {
            const currentSearch = new URLSearchParams(location.search)
            const searchDesignTheme = currentSearch.get('designTheme')
            if (searchDesignTheme)
                dispatch(SetTempValue('selectedDesignTheme', +searchDesignTheme))

            const requestSendAction = RequestSend('allDesignTheme', {
                url: '/package/GetDesignThemes'
            })
            dispatch(requestSendAction)
        },
        onChange: (value) => {
            const newURL = new URL(location.href)
            newURL.searchParams.delete('page')
            
            if (!value)
                newURL.searchParams.delete('designTheme')
            else
                newURL.searchParams.set('designTheme', value)
            
            const newURI = `${newURL.pathname}${newURL.search}`

            dispatch(push(newURI))
            dispatch(SetTempValue('selectedDesignTheme', value))
        }
    }
}

const FilterByDesingThemeComponentWithPureData = ExtractImmutableHOC(FilterByDesingThemeComponent)
export const FilterByDesingTheme =
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(FilterByDesingThemeComponentWithPureData)