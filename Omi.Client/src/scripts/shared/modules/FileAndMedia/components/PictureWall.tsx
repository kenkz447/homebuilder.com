import { Icon } from 'antd'
import differenceBy = require('lodash/differenceBy')
import * as React from 'react'

import { FileEntityInfo } from '../Types'

export interface PictureWallSelectDispathProps {
    onClick?: () => void
}
export interface PictureWallSelectStateProps {
    selectedValues?: Array<FileEntityInfo>
}
export interface PictureWallSelectProps extends PictureWallSelectStateProps, PictureWallSelectDispathProps {
    id?: string
    /** Initial value */
    value?: Array<FileEntityInfo>
    onChange?: (value) => void
}

export class PictureWallComponent extends React.Component<PictureWallSelectProps> {
    componentWillReceiveProps(nextProps: PictureWallSelectProps = { selectedValues: [] }) {
        const value = (this.props.selectedValues || this.props.value || [])
        const selectedValues = nextProps.selectedValues || this.props.value || []

        let diff = []
        if (value.length > selectedValues.length)
            diff = differenceBy(value, selectedValues, (o) => o.fileId)
        else
            diff = differenceBy(selectedValues, value, (o) => o.fileId)

        if (diff.length > 0)
            this.props.onChange(selectedValues)
    }

    render() {
        const valueToRender = this.props.selectedValues || this.props.value || []

        return (
            <div className="picture-wall">
                <div className="picture-wall-container">
                    <div className="picture-wall-select picture-wall-item" tabIndex={0} onClick={this.props.onClick}>
                        <span className="picture-wall-icon"> <Icon type="picture" /></span>
                        <label className="picture-wall-text">Select Image</label>
                    </div>
                    {
                        valueToRender.map(this.renderFileinfo.bind(this))
                    }
                </div>
            </div>
        )
    }

    renderFileinfo(fileInfo: FileEntityInfo) {
        return (
            <div key={fileInfo.fileId} className="picture-wall-item">
                <img className="picture-wall-item-image" src={`${window.baseUrl}${fileInfo.srcThumb || fileInfo.src}`} />
            </div>
        )
    }
}