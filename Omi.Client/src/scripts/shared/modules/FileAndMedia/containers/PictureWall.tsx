import { connect } from 'react-redux'
import { ExtractImmutableHOC } from '../../../core'

import { PictureWallComponent, PictureWallSelectStateProps, PictureWallSelectProps, PictureWallSelectDispathProps } from '../components'
import { ModuleRootState, FileType } from '../Types'
import { OpenModal, SetCheckedFiles } from '../state'

const mapStateToProps = (state: ModuleRootState, ownProps: PictureWallSelectProps): PictureWallSelectStateProps => {
    return {
        selectedValues: state.fileAndMedia.getIn(['selected', ownProps.id])
    }
}

const mapDispatchToProps = (dispatch, ownProps: PictureWallSelectProps): PictureWallSelectDispathProps => {
    return {
        onClick: () => {
            const handleKey = ownProps.id
            const openModalAction = OpenModal({
                handleKey,
                acceptType: FileType.Image,
                allowSelectMulti: true
            })
            dispatch(openModalAction)

            const setModalSelectedFilesAction = SetCheckedFiles({ files: ownProps.value })
            dispatch(setModalSelectedFilesAction)
        }
    }
}

const ComponentWithPureData = ExtractImmutableHOC(PictureWallComponent)
export const PictureWall = connect(mapStateToProps, mapDispatchToProps)(ComponentWithPureData)