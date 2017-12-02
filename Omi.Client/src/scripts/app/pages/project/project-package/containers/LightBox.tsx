import * as React from 'react'
import * as Lightbox from 'react-image-lightbox'
import { WebsiteRootState } from 'app/Types'
import { SetTempValue } from 'shared/core'
import { connect } from 'react-redux'
import { FileEntityInfo } from 'shared/modules/FileAndMedia'

export default class LightboxExample extends React.Component<any> {
    static defaultProps = {
        images: []
    }
    render() {
        const mainSrc: FileEntityInfo = this.props.images[this.props.photoIndex]
        const nextSrc: FileEntityInfo = this.props.images[(this.props.photoIndex + 1) % this.props.images.length]
        const prevSrc: FileEntityInfo = this.props.images[(this.props.photoIndex + this.props.images.length - 1) % this.props.images.length]

        return (
            <div>
                {this.props.photoIndex != undefined &&
                    <Lightbox
                        mainSrc={mainSrc && `${window.baseUrl}${mainSrc.src}`}
                        nextSrc={nextSrc && `${window.baseUrl}${nextSrc.src}`}
                        prevSrc={prevSrc && `${window.baseUrl}${prevSrc.src}`}

                        onCloseRequest={() => this.props.close()}
                        onMovePrevRequest={() => this.props.changeIndex((this.props.photoIndex + this.props.images.length - 1) % this.props.images.length)}
                        onMoveNextRequest={() => this.props.changeIndex((this.props.photoIndex + 1) % this.props.images.length)}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState) => {
    return {
        photoIndex: state.temp.get('PROJECT_PACKGE_PHOTO_INDEX'),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        close: () => {
            dispatch(SetTempValue('PROJECT_PACKGE_PHOTO_INDEX', undefined))
        },
        changeIndex: (index) => {
            dispatch(SetTempValue('PROJECT_PACKGE_PHOTO_INDEX', index))
        }
    }
}

export const ConnectedLightbox = connect(mapStateToProps, mapDispatchToProps)(LightboxExample)