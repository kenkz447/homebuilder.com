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
        downloadUrl: state.data.getIn(['BLOG_EXPORT_EXCEL_URL', 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        download: () => {
            const action = RequestSend('BLOG_EXPORT_EXCEL_URL', {
                url: '/blogUti/export',
                requestInit: {
                    credentials: 'include'
                }
            })

            dispatch(action)
        },
        deleteCache: () => {
            const action = RequestCacheDelete('BLOG_EXPORT_EXCEL_URL')
            dispatch(action)
        }
    }
}

export const ConnectedExportExcel = connect(mapStateToProps, mapDispatchToProps)(ExportExcel)