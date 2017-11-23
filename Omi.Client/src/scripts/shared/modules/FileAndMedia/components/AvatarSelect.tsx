import { Icon } from 'antd'
import * as React from 'react'

import { FileEntityInfo } from '../Types'

export interface AvatarSelectDispathProps {
    onClick?: (handleKey: string) => void
}
export interface AvatarSelectStateProps {
    selectedValue?: FileEntityInfo
}
export interface AvatarSelectProps extends AvatarSelectStateProps, AvatarSelectDispathProps {
    id?: string
    /** Initial value */
    value?: FileEntityInfo
    onChange?: (value) => void
}

export class AvatarSelectComponent extends React.Component<AvatarSelectProps> {
    static defaultProps = {
        selectedValue: {}
    }

    componentWillReceiveProps(nextProps: AvatarSelectProps) {
        if (this.props.selectedValue.fileId != nextProps.selectedValue.fileId)
            this.props.onChange(nextProps.selectedValue)
    }

    render() {
        const { selectedValue, id, onClick, value } = this.props
        const currentValue = selectedValue.fileId ? selectedValue : value
        return (
            <div className="avatar-select">
                <div className="avatar-select-container">
                    <div className="avatar-select-holder" tabIndex={0} onClick={(e) => { onClick(id) }}>
                        <span className="avatar-select-icon">
                            <Icon type="picture" />
                        </span>
                        <label className="avatar-select-text">
                            Select Image
                            </label>
                        {
                            currentValue && <img className="avatar-select-image" src={`${window.baseUrl}${currentValue.srcThumb || currentValue.src}`} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}