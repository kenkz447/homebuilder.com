import * as React from 'react'
import { Upload, message, Button, Icon } from 'antd'

const initProps = {
    name: 'file',
    action: `${window.baseUrl}/api/productUti/import`,
    withCredentials: true,
    headers: {
        authorization: 'authorization-text',
    },
    
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    }
}

export function UploadExcel(props) {
    return (
        <Upload {...initProps} >
            <Button>
                <Icon type="upload" /> Import from excel
            </Button>
        </Upload>
    )
}