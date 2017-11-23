import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { Collapse } from 'antd'
import * as $ from 'jquery-slim'

import { SetTempValue } from 'shared/core'
import { WebsiteRootState } from '../../Types'

interface DropdownDispatchProps {
    togleDropdown?: (isOpen: boolean) => void
}
interface DropdownStateProps {
    isDropdownActive?: boolean
}
interface DropdownProps extends DropdownDispatchProps, DropdownStateProps {
    label?: string
    toggleKey?: string
    children?: any
}

const { Panel } = Collapse

class DropdownComponent extends React.Component<DropdownProps> {
    collapse
    componentDidMount() {
        const collapseElement = findDOMNode(this.collapse)
        const collapseHeader = $(collapseElement).find('.ant-collapse-header')
        collapseHeader.addClass('f-dropdown-toggle')
    }

    render() {
        const activeKey = this.props.isDropdownActive ? "1" : undefined

        return (
            <div onClick={(e) => {
                const target = e.target as any
                if (target.classList.contains('f-dropdown-toggle'))
                    this.props.togleDropdown(!this.props.isDropdownActive)
            }} onMouseLeave={() => {
                if (this.props.isDropdownActive)
                    this.props.togleDropdown(false)
            }}>
                <Collapse className="brand-dropdown" ref={((element) => this.collapse = element)} activeKey={activeKey} bordered={false} >
                    <Panel className="f-toggle-dropdown" header={this.props.label} key="1">
                        {this.props.children}
                    </Panel>
                </Collapse>
            </div>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState, ownProps: DropdownProps): DropdownStateProps => {
    return {
        isDropdownActive: state.temp.get(ownProps.toggleKey)
    }
}

const mapDispatchToProps = (dispatch, ownProps: DropdownProps): DropdownDispatchProps => {
    return {
        togleDropdown: (isOpen: boolean) => {
            const setTempValueAction = SetTempValue(ownProps.toggleKey, isOpen)
            dispatch(setTempValueAction)
        }
    }
}
export const Dropdown = connect<DropdownStateProps, DropdownDispatchProps>(mapStateToProps, mapDispatchToProps)(DropdownComponent)