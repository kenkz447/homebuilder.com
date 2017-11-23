import { connect } from 'react-redux'

import { ExtractImmutableHOC } from '../../../core'

import { FileType, ModuleRootState } from '../Types'
import { OpenModal, SetCheckedFiles } from '../state'
import { AvatarSelectComponent, AvatarSelectDispathProps, AvatarSelectStateProps, AvatarSelectProps } from '../components'


const mapStateToProps = (state: ModuleRootState, ownProps: AvatarSelectProps): AvatarSelectStateProps => {
    return {
        selectedValue: state.fileAndMedia.getIn(['selected', ownProps.id])
    }
}

const mapDispatchToProps = (dispatch, ownProps: AvatarSelectProps): AvatarSelectDispathProps => {
    return {
        onClick: (handleKey: string) => {
            const openModalAction = OpenModal({
                handleKey: ownProps.id,
                acceptType: FileType.Image
            })
            dispatch(openModalAction)

            const setModalSelectedFilesAction = SetCheckedFiles({ files: ownProps.value && [ownProps.value] })
            dispatch(setModalSelectedFilesAction)
        }
    }
}

const AvatarSelectWithPureData = ExtractImmutableHOC(AvatarSelectComponent)
export const AvatarSelect = connect(mapStateToProps, mapDispatchToProps)(AvatarSelectWithPureData)