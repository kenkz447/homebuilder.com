import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Tabs, Button } from 'antd'
import { ExtractImmutableHOC } from '../../../core/index'

import { FileEntityInfo, ModuleRootState } from '../Types'
import { FILES_DATA_KEY } from '../settings'

import { FileItem } from './FileItem'

interface FileListStateProps {
    files: Array<FileEntityInfo>
    rencentUploadFiles: Array<FileEntityInfo>
    selectedFiles: Array<FileEntityInfo>
    initCheckedFiles: Array<FileEntityInfo>
}

const RRR = (array: Array<FileEntityInfo>, label: string) => {
    if (!array.length)
        return null
    
    return (
        <div className="file-list-recent">
            <label className="d-block mb-2">{label}</label>
            <Row className="file-list" gutter={6} >
                {array.map((fileInfo) => (<Col key={fileInfo.fileId} span={4}><FileItem fileInfo={fileInfo} /></Col>))}
            </Row>
        </div>
    )
}

const FileListComponent = (props: React.HTMLProps<any> & FileListStateProps) => {
    const rencentUploadFileIds = props.rencentUploadFiles && props.rencentUploadFiles.map((o) => o.fileId)

    const selectedFiles = props.selectedFiles && props.selectedFiles.filter((o) => {
        // don't display item if item is recent upload file here
        if (rencentUploadFileIds)
            return rencentUploadFileIds.indexOf(o.fileId) < 0

        return true
    })

    const selectedFileToRenderIds = selectedFiles && selectedFiles.map((o) => o.fileId)
    const initCheckedFilesToRender = props.initCheckedFiles && (
        props.initCheckedFiles.filter((o) => {
            if (selectedFileToRenderIds)
                return selectedFileToRenderIds.indexOf(o.fileId) < 0

            return true
        })
    )

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Selected" key="1">
                    {props.rencentUploadFiles && RRR(props.rencentUploadFiles, 'Recent upload')}
                    {selectedFiles && RRR(selectedFiles, 'Selected')}
                    {initCheckedFilesToRender && RRR(initCheckedFilesToRender, 'Unselected')}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Liblary" key="2">
                    <Row className="file-list" gutter={6} >
                        {props.files && props.files.map((fileInfo) => (<Col key={fileInfo.fileId} span={4}><FileItem fileInfo={fileInfo} /></Col>))}
                    </Row>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

const mapStateToProps = (state: ModuleRootState, ownProps): FileListStateProps => {
    return {
        files: state.data.getIn([FILES_DATA_KEY, 'response', 'result']),
        rencentUploadFiles: state.fileAndMedia.get('RECENT_UPLOAD_FILES'),
        selectedFiles: state.fileAndMedia.get('CHECKED_FILES'),
        initCheckedFiles: state.fileAndMedia.get('INIT_CHECKED_FILES')
    }
}

const ComponentWithPureData = ExtractImmutableHOC(FileListComponent)
export const FileList = connect(mapStateToProps)(ComponentWithPureData)