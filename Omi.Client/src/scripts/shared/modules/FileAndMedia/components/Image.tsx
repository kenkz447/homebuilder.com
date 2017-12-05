import * as React from 'react'
import * as Img from 'react-image'

import { FileEntityInfo } from '../Types'
import { Spin } from 'antd'

interface ImgProps {
    fileEntityInfo: FileEntityInfo
    className?: string
    displayThumb?: boolean
    style?: React.CSSProperties
}
export class Image extends React.Component<ImgProps> {
    render() {
        if (!this.props.fileEntityInfo)
            return null
        
        return (
            <div className="mw-100">
                <Img.default loader={<Spin />} className={this.props.className} src={`${window.baseUrl}${this.props.displayThumb ? this.props.fileEntityInfo.srcThumb : this.props.fileEntityInfo.src}`} />
            </div>
        )
    }
}