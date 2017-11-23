import * as React from 'react'
import { connect } from 'react-redux'

import { ExtractImmutableHOC } from '../../../../../shared/core'
import { GoogleMap } from "../../../../../shared/modules/Location"
import { WebsiteRootState } from '../../../../Types'

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
            <div style={{width: 230}}>
                <img src={`${window.baseUrl}${marker.thumbnail}`} style={{maxWidth: '100%'}}/>
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