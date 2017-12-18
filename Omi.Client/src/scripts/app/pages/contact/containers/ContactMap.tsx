import * as React from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'

import { ExtractImmutableHOC } from '../../../../shared/core'
import { GoogleMap } from "../../../../shared/modules/Location"
import { WebsiteRootState } from '../../../Types'
import { WebsiteSettingFormValue } from '../../../../Admin'
import { Image } from '../../../../shared/modules/FileAndMedia'

interface StateProps {
    websiteSetting: WebsiteSettingFormValue
}

@(ExtractImmutableHOC as any)
class ContactMap extends React.Component<StateProps> {
    markers = []

    render() {
        if (!this.props.websiteSetting)
            return null
        const lat = +this.props.websiteSetting.contactMapLatitude.value
        const lng = +this.props.websiteSetting.contactMapLongitude.value
        return (
            <div className="brand-container">
                <div className="contact-map-conatiner">
                    <div className="contact-map">
                        <GoogleMap
                            center={[lat, lng]}
                            zoom={10}
                            markers={[{ id: 1, lat, lng }]}
                            renderMarkerContent={this.renderMarkerContent}
                        />
                    </div>
                </div>
            </div>
        )
    }

    @autobind
    renderMarkerContent(marker) {
        return (
            <div className="hint__content map-marker-hint noevents" style={{ width: 250, left: -21, marginLeft: 0 }}>
                <div className="b-marker clearfix">
                    <div className="d-inline-block">
                        <h4 className="h5" style={{ color: 'rgb(255, 255, 255)' }}>
                            {this.props.websiteSetting.companyName.value}
                        </h4>
                        <span style={{ color: 'rgb(255, 255, 255)', lineHeight: 1.5 }}>
                            {this.props.websiteSetting.companyAddress.value}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        websiteSetting: state.data.getIn(['WEBSITE_SETTING', 'response', 'result'])
    }
}

export const ConnectedContactMap = connect(mapStateToProps)(ContactMap)