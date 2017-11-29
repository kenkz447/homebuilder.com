import * as React from 'react'
import * as Img from 'react-image'
const VisibilitySensor = require('react-visibility-sensor')

import { FileEntityInfo } from '../Types'
import { Spin } from 'antd'

interface ImgProps {
    fileEntityInfo: FileEntityInfo
    classNames?: string
    displayThumb?: boolean
    style?: React.CSSProperties
}
export class Image extends React.Component<ImgProps> {
    // style={{ width: this.props.fileEntityInfo.width, height: this.props.fileEntityInfo.height }} 
    render() {
        if (!this.props.fileEntityInfo)
            return null
        
        return (
            <div className="mw-100">
                <VisibilitySensor>
                    {({ isVisible }) =>
                        <Img.default loader={<Spin />} className={this.props.classNames} src={`${window.baseUrl}${this.props.displayThumb ? this.props.fileEntityInfo.srcThumb : this.props.fileEntityInfo.src}`} />
                    }
                </VisibilitySensor>
            </div>
        )
    }
}