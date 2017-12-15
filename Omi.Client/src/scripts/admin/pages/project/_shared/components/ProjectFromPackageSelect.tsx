import * as React from 'react'
import { connect } from 'react-redux'
import { Select } from 'antd'

import { PageEntityViewModel } from 'shared/modules/website'
import { ModuleRootState, PackageViewModel } from '../../../../Types'
import { RequestSend, ExtractImmutableHOC } from 'shared/core'

interface DispathProps {
    getPackages?: () => void
    onSelectChange?: (value) => void
}

interface StateProps {
    packages : PageEntityViewModel<PackageViewModel>
}

interface OwnProps {
    id?: any
    value?: any
    onChange?: (value) => void
    form?: any
}

export function PackageSelect(props: OwnProps & StateProps & DispathProps) {
    if (!props.packages) {
        props.getPackages()
        return null
    }

    const entities = props.packages.entities.filter(o => o.id == props.value || !o.projectBlockId)

    return (
        <Select placeholder="Package" onChange={props.onSelectChange} value={props.value} allowClear>
            {entities.map((o) => <Select.Option key={o.id} value={o.id}>{o.title}</Select.Option>)}
        </Select>
    )
}

const mapStateToProps = (state: ModuleRootState, ownProps: OwnProps): StateProps => {
    return {
        packages: state.data.getIn(['packages', 'response'])
    }
}
 
const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispathProps => {
    return {
        getPackages: () => {
            const params = new URLSearchParams()
            params.append('getTypes', 'perspective')
            const requestSendAction = RequestSend(
                'packages', {
                    url: `/package/getPackages?${params.toString()}`,
                    requestInit: {
                        credentials: 'include'
                    }}
                )
            dispatch(requestSendAction)
        },
        onSelectChange: (value) => {
            //const action = SetTempValue('PACKAGES_SELETED', [])
            ownProps.onChange(value)
        }
    }
}

export const ConnectedPackageSelect = connect(mapStateToProps, mapDispatchToProps)(ExtractImmutableHOC(PackageSelect))