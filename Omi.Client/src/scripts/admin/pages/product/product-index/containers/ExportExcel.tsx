import * as React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { ModuleRootState } from 'admin/Types'
import { RequestSend, RequestCacheDelete } from 'shared/core'

export function ExportExcel(props) {
    if (props.downloadUrl) {
        location = props.downloadUrl
        props.deleteCache()
    }

    return (
        <Button onClick={props.download}>Export to excel</Button>
    )
}

const mapStateToProps = (state: ModuleRootState) => {
    return {
        downloadUrl: state.data.getIn(['PRODUCT_EXPORT_EXCEL_URL', 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        download: () => {
            const action = RequestSend('PRODUCT_EXPORT_EXCEL_URL', {
                url: '/productUti/export',
                requestInit: {
                    credentials: 'include'
                }
            })

            dispatch(action)
        },
        deleteCache: () => {
            const action = RequestCacheDelete('PRODUCT_EXPORT_EXCEL_URL')
            dispatch(action)
        }
    }
}

export const ConnectedExportExcel = connect(mapStateToProps, mapDispatchToProps)(ExportExcel)