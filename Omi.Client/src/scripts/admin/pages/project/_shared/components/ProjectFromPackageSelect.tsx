import * as React from 'react'
import { connect } from 'react-redux'
import { Select } from 'antd'

import { PageEntityViewModel } from 'shared/modules/website'
import { ModuleRootState, PackageViewModel } from '../../../../Types'
import { RequestSend, ExtractImmutableHOC } from 'shared/core'

interface DispathProps {
    getPackages?: () => void
}

interface StateProps {
    packages : PageEntityViewModel<PackageViewModel>
}

interface OwnProps {
    id?: any
    value?: any
    onChange?: () => void
    form?: any
}

export function PackageSelect(props: OwnProps & StateProps & DispathProps) {
    if (!props.packages) {
        props.getPackages()
        return null
    }

    return (
        <Select placeholder="Package" onChange={props.onChange} value={props.value} allowClear>
            {props.packages.entities.map((o) => <Select.Option key={o.id} value={o.id}>{o.title}</Select.Option>)}
        </Select>
    )
}

const mapStateToProps = (state: ModuleRootState, ownProps: OwnProps): StateProps => {
    return {
        packages: state.data.getIn(['packages', 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch): DispathProps => {
    return {
        getPackages: () => {
            const requestSendAction = RequestSend(
                'packages', {
                    url: `/package/getPackages`,
                    requestInit: {
                        credentials: 'include'
                    }}
                )
            dispatch(requestSendAction)
        }
    }
}

export const ConnectedPackageSelect = connect(mapStateToProps, mapDispatchToProps)(ExtractImmutableHOC(PackageSelect))