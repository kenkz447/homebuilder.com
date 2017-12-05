import * as React from 'react'
import { connect } from 'react-redux'

import { ExtractImmutableHOC } from '../../../../../shared/core'
import { GoogleMap } from "../../../../../shared/modules/Location"
import { WebsiteRootState } from '../../../../Types'
import { Image } from 'shared/modules/FileAndMedia/components';

interface StateProps {
    markers: Array<any>
}

class Component extends React.Component<StateProps> {
    render() {
        return (
            <GoogleMap
                markers={this.props.markers}
                renderMarkerContent={this.renderMarkerContent}
            />
        )
    }

    renderMarkerContent(marker) {
        return (
            <div className="map-marker-project" style={{ width: 230 }}>
                <div className="map-marker-project-thumbnail" >
                    <Image className="d-block mw-100 w-100" fileEntityInfo={marker.thumbnail} />
                </div>
                <figure className="map-marker-project-title">{marker.title}</figure>
            </div>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        markers: state.temp.get('PROJECT_MARKERS')
    }
}

const ComponentWithPureData = ExtractImmutableHOC(Component)

export const ProjectMap = connect(mapStateToProps)(ComponentWithPureData)