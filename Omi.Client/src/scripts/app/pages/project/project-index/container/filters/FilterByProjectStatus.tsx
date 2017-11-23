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
    allProjectStatus: Array<TaxonomyViewModel>
    selectedProjectStatus: number
}

const dropdownKey = uuidv1()

class Component extends React.Component<StateProps & DispatchProps> {
    componentWillMount() {
        this.props.initValue()
    }

    render() {
        return (
            <div className="filter">
                <label className="filter-label">Project status</label>
                <Dropdown toggleKey={dropdownKey} label={this.getActiveLabel()}>
                    <div className="btn-menu">
                    <Button className="btn-menu-link" onClick={() => { this.props.onChange(0) }} disabled={0 == this.props.selectedProjectStatus}>All</Button>
                    {
                            this.props.allProjectStatus && this.props.allProjectStatus.map((o) => (
                                <Button key={o.id} className="btn-menu-link f-dropdown-toggle" disabled={o.id == this.props.selectedProjectStatus} onClick={(() => {
                                    this.props.onChange(o.id)
                                }).bind(this)}>{o.label}</Button>
                            ))
                        }
                    </div>
                </Dropdown>
            </div>
        )
    }
    getActiveLabel() {
        if (!this.props.allProjectStatus || !this.props.selectedProjectStatus)
            return 'All'

        const selectedProjectStatus = this.props.allProjectStatus.find((o) => o.id == this.props.selectedProjectStatus)
        return selectedProjectStatus.label
    }
}

const mapStateToProps = (state, ownProps): StateProps => {
    return {
        allProjectStatus: state.data.getIn(['allProjectStatus', 'response', 'result']),
        selectedProjectStatus: state.temp.get('selectedProjectStatus')
    }
}

const mapDispatchToProps = (dispatch, ownProps): DispatchProps => {
    return {
        initValue: () => {
            const currentSearch = new URLSearchParams(location.search)
            const searchProjectStatus = currentSearch.get('projectStatus')
            if (searchProjectStatus)
                dispatch(SetTempValue('selectedProjectStatus', +searchProjectStatus))

            const requestSendAction = RequestSend('allProjectStatus', {
                url: '/project/getAllProjectStatus'
            })
            dispatch(requestSendAction)
        },
        onChange: (value) => {
            const newURL = new URL(location.href)
            newURL.searchParams.delete('page')
            
            if (!value)
                newURL.searchParams.delete('projectStatus')
            else
                newURL.searchParams.set('projectStatus', value)

            const newURI = `${newURL.pathname}${newURL.search}`
            dispatch(push(newURI))
            dispatch(SetTempValue('selectedProjectStatus', value))
        }
    }
}

const ComponentWithPureData = ExtractImmutableHOC(Component)
export const FilterByProjectStatus = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ComponentWithPureData)