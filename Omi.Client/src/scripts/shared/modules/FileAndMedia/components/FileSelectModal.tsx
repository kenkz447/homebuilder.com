import { Icon, message, Modal, Upload } from 'antd'
import { autobind } from 'core-decorators'
import * as React from 'react'

import { uploadURL } from '../settings'
import { FileEntityInfo } from '../Types'

import { FileList } from './FileList'

export interface FileSelectModalDispatchProps {
    handleOk?: (selected: FileEntityInfo | Array<FileEntityInfo>) => void
    handleCancel?: (e: React.MouseEvent<any>) => void
    setRecentUploadFiles?: (files) => void
}

export interface FileSelectModalStateProps {
    visible?: boolean
    allowSelectMulti: boolean
}

const Dragger = Upload.Dragger

const draggerProps = {
    name: 'file',
    multiple: true,
    showUploadList: false,
    action: uploadURL.href,
    withCredentials: true,
}

export class FileSelectModalComponent extends React.Component<FileSelectModalStateProps & FileSelectModalDispatchProps> {

    render() {
        const { visible, handleOk, handleCancel } = this.props
        return (
            <Modal className="file-select-modal-wrapper" title="Files" cancelText="Cancel" okText="Select" visible={visible} width={1024}
                onOk={() => { handleOk([]) }} onCancel={handleCancel}>
                <div style={{ height: 180, marginBottom: 15 }}>
                    <Dragger {...draggerProps} onChange={this.onDraggerChange}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Dragger>
                </div>
                <FileList />
            </Modal>
        )
    }

    @autobind
    onDraggerChange(info) {
        const status = info.file.status
        if (status !== 'uploading') {
            console.log(info.file, info.fileList)
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
            const recentFileList = info.fileList.map((o) => o.response.result[0])

            this.props.setRecentUploadFiles(recentFileList)
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    }
}