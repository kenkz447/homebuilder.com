import * as React from 'react'
import { connect } from 'react-redux'
import * as classnames from 'classnames'

import { ExtractImmutableHOC, RequestSend } from '../../../core/index'

import { FileEntityInfo, ModuleRootState } from '../Types'
import { FileItemClick } from '../state'
import { Button } from 'antd'

interface FileItemDispatchProps {
    fileItemClick?: () => void
    deleteFile?: () => void
}

interface FileItemStateProps {
    /** All file was checked by user*/
    checkedFiles?: Array<FileEntityInfo>
    isDeleted?: boolean
}

interface FileItemProps extends FileItemDispatchProps, FileItemStateProps {
    fileInfo: FileEntityInfo
}

const confirmDeleteFile = (callBack: () => void) => {
    if (confirm('Sure?') == true)
        callBack()
}

export function FileItemComponent (props: FileItemProps) {
    const { checkedFiles, fileInfo, fileItemClick } = props

    const checked = checkedFiles && checkedFiles.findIndex((o) => o.fileId == fileInfo.fileId) >= 0

    if (props.isDeleted)
        return null

    return (
        <div className="file-list-item-wrapper">
            <div className={classnames("file-list-item", { 'checked': checked })}
                data-property-file-id={fileInfo.fileId}
                onClick={fileItemClick}
            >
                <img className="file-list-item-image" src={`${window.baseUrl}${fileInfo.srcThumb || fileInfo.src}`} />
            </div>
            <div className="i-actions">
                <Button className="mr-1" icon="info-circle" shape="circle"></Button>
                <Button
                    type="danger"
                    icon="delete"
                    shape="circle"
                    disabled={checked}
                    onClick={() => { confirmDeleteFile(props.deleteFile) }}
                ></Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state: ModuleRootState, ownProps: FileItemProps): FileItemStateProps => {
    return {
        checkedFiles: state.fileAndMedia.get('CHECKED_FILES'),
        isDeleted: state.data.getIn([`FILE_DELETED_${ownProps.fileInfo.fileId}`, 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch, ownProps: FileItemProps): FileItemDispatchProps => {
    return {
        fileItemClick: () => {
            const fileItemClickAction = FileItemClick(ownProps.fileInfo)
            dispatch(fileItemClickAction)
        },
        deleteFile: () => {
            const requestSendAction = RequestSend(
                `FILE_DELETED_${ownProps.fileInfo.fileId}`, {
                    url: `/files/delete?id=${ownProps.fileInfo.fileId}`,
                    requestInit: {
                        method: 'POST',
                        credentials: 'include'
                    }
                })
            dispatch(requestSendAction)
        }
    }
}

const ComponentWithPureData = ExtractImmutableHOC(FileItemComponent)

export const FileItem = connect(mapStateToProps, mapDispatchToProps)(ComponentWithPureData)
