import { connect } from 'react-redux'

import { ExtractImmutableHOC, SetTempValue } from '../../../core'
import { FileSelectModalComponent, FileSelectModalDispatchProps, FileSelectModalStateProps } from '../components'
import { CloseModal, OkModal, SetRecentUploadFiles } from '../state'
import { ModuleRootState } from '../Types'

const mapStateToProps = (state: ModuleRootState): FileSelectModalStateProps => {
    return {
        visible: state.fileAndMedia.get('visible'),
        allowSelectMulti: state.fileAndMedia.get('allowSelectMulti')
    }
}

const mapDispatchToProps = (dispatch): FileSelectModalDispatchProps => {
    return {
        handleOk: () => {
            const okModalAction = OkModal()
            dispatch(okModalAction)
        },
        handleCancel: () => {
            const closeModalAction = CloseModal()
            dispatch(closeModalAction)
        },
        setRecentUploadFiles: (files) => {
            const setTempValueAction = SetRecentUploadFiles({ files })
            return dispatch(setTempValueAction)
        }
    }
}

const ComponentWithPureData = ExtractImmutableHOC(FileSelectModalComponent)

export const FileSelectModal = connect(mapStateToProps, mapDispatchToProps)(ComponentWithPureData)