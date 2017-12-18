import * as React from 'react'
import * as Img from 'react-image'

import { FileEntityInfo } from '../Types'
import { Spin } from 'antd'
import * as classNames from 'classnames';

interface ImgProps {
    fileEntityInfo: FileEntityInfo
    containerClassName?: string
    className?: string
    displayThumb?: boolean
    style?: React.CSSProperties
}
export class Image extends React.Component<ImgProps> {
    render() {
        if (!this.props.fileEntityInfo)
            return null
        
        return (
            <div className={classNames('mw-100', this.props.containerClassName)}>
                <Img.default loader={<Spin />} className={this.props.className} src={`${window.baseUrl}${this.props.displayThumb ? this.props.fileEntityInfo.srcThumb : this.props.fileEntityInfo.src}`} />
            </div>
        )
    }
}