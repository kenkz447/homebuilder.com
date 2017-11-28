import * as React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { ButtonSize } from 'antd/lib/button/button'

import { ExtractImmutableHOC } from '../../../core'

import { FileType, ModuleRootState, FileEntityInfo } from '../Types'
import { OpenModal, CleanSelectedResult } from '../state'
import { Image } from 'shared/modules/FileAndMedia'

interface StateProps {
    selectedValue?: FileEntityInfo,
    modalVisible: boolean
}

interface DispatchProps {
    openModal?: () => void
    cleanSelectedResult?: () => void
}

interface OwnProps {
    label?: string
    classNames?: string
    icon?: string
    size?: ButtonSize
    onChange?: (value: FileEntityInfo) => void
    onClick?: () => void
    onModalClose?: () => void
    id?: string
    buttonStyle?: React.CSSProperties
    value?: FileEntityInfo
}

class Component extends React.Component<StateProps & DispatchProps & OwnProps> {
    componentWillReceiveProps(nextProps: OwnProps & StateProps & DispatchProps) {
        if (nextProps.value && nextProps.value.fileId == this.props.selectedValue.fileId)
            // Clean Media Selected after form value setted
            this.props.cleanSelectedResult()
        else if (this.props.selectedValue.fileId != nextProps.selectedValue.fileId)
            this.props.onChange(nextProps.selectedValue)
        
        if (this.props.modalVisible != nextProps.modalVisible)
            if (!nextProps.modalVisible && this.props.onModalClose)
                this.props.onModalClose()
    }

    render() {
        return (
            <div>
                {
                    this.props.selectedValue && (
                        <div className="mb-2">
                            <Image style={{ width: 150 }} fileEntityInfo={this.props.value} displayThumb />
                        </div>
                    )
                }
                <Button className={this.props.classNames}
                    style={this.props.buttonStyle}
                    icon={this.props.icon}
                    size={this.props.size}
                    onClick={this.props.openModal}>
                    {this.props.label}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state: ModuleRootState, ownProps: OwnProps): StateProps => {
    return {
        selectedValue: state.fileAndMedia.getIn(['selected', ownProps.id]) || {},
        modalVisible: state.fileAndMedia.get('visible')
    }
}

const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
    return {
        openModal: () => {
            const openModalAction = OpenModal({
                handleKey: ownProps.id,
                acceptType: FileType.Image
            })
            dispatch(openModalAction)

            if (ownProps.onClick)
                ownProps.onClick()
        },
        cleanSelectedResult: () => {
            const action = CleanSelectedResult({ handleKey: ownProps.id })
            dispatch(action)
        }
    }
}

const ComponentWithPureData = ExtractImmutableHOC(Component)
export const FormFileSelect = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ComponentWithPureData)