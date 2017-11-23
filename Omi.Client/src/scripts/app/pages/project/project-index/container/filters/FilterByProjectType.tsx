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
    allProjectType: Array<TaxonomyViewModel>
    selectedProjectType: string
}

const dropdownKey = uuidv1()

class Component extends React.Component<StateProps & DispatchProps> {
    componentWillMount() {
        this.props.initValue()
    }

    render() {
        return (
            <div className="filter">
                <label className="filter-label">Project type</label>
                <Dropdown toggleKey={dropdownKey} label={this.getActiveLabel()}>
                    <div className="btn-menu">
                    <Button className="btn-menu-link" onClick={() => { this.props.onChange(0) }} disabled={!this.props.selectedProjectType}>All</Button>
                    {
                            this.props.allProjectType && this.props.allProjectType.map((o) => (
                                <Button key={o.id} className="btn-menu-link f-dropdown-toggle" disabled={o.name == this.props.selectedProjectType} onClick={(() => {
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
        if (!this.props.allProjectType || !this.props.selectedProjectType)
            return 'All'

        const selectedProjectType = this.props.allProjectType.find((o) => o.name == this.props.selectedProjectType)
        return selectedProjectType.label
    }
}

const mapStateToProps = (state, ownProps): StateProps => {
    return {
        allProjectType: state.data.getIn(['allProjectType', 'response', 'result']),
        selectedProjectType: state.temp.get('selectedProjectType')
    }
}

const mapDispatchToProps = (dispatch, ownProps): DispatchProps => {
    return {
        initValue: () => {
            const currentSearch = new URLSearchParams(location.search)
            const searchProjectType = currentSearch.get('projectType')
            if (searchProjectType)
                dispatch(SetTempValue('selectedProjectType', searchProjectType))

            const requestSendAction = RequestSend('allProjectType', {
                url: '/project/getAllProjectTypes'
            })
            dispatch(requestSendAction)
        },
        onChange: (value) => {
            const newURL = new URL(location.href)
            newURL.searchParams.delete('page')
            
            if (!value)
                newURL.searchParams.delete('projectType')
            else
                newURL.searchParams.set('projectType', value)

            const newURI = `${newURL.pathname}${newURL.search}`
            dispatch(push(newURI))
            dispatch(SetTempValue('selectedProjectType', value))
        }
    }
}

const ComponentWithPureData = ExtractImmutableHOC(Component)
export const FilterByProjectType = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ComponentWithPureData)