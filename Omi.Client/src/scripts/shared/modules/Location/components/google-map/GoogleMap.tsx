import { autobind } from 'core-decorators'
import GoogleMapReact from 'google-map-react'
import * as React from 'react'
import * as controllable from 'react-controllables'
import shouldPureComponentUpdate from 'react-pure-render/function'

import { markerDescriptions } from './constants/marker-descriptions'
import { customDistanceToMouse } from './helpers/custom-distance'
import { Marker } from './Marker'

const K_MARGIN_TOP = 30
const K_MARGIN_RIGHT = 30
const K_MARGIN_BOTTOM = 30
const K_MARGIN_LEFT = 30

const styles = [{ 'featureType': 'administrative', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#444444' }] }, { 'featureType': 'landscape', 'elementType': 'all', 'stylers': [{ 'color': '#f2f2f2' }] }, { 'featureType': 'poi', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'road', 'elementType': 'all', 'stylers': [{ 'saturation': -100 }, { 'lightness': 45 }] }, { 'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'road.arterial', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'transit', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'water', 'elementType': 'all', 'stylers': [{ 'color': '#878787' }, { 'visibility': 'on' }] }, { 'featureType': 'water', 'elementType': 'geometry', 'stylers': [{ 'invert_lightness': true }, { 'weight': '3.37' }, { 'gamma': '5' }, { 'saturation': '0' }, { 'lightness': '0' }] }]

@controllable(['center', 'zoom', 'markers'])
export class GoogleMap extends React.Component<any> {
    static defaultProps = {
        center: [15.866913899999986, 104.1218629],
        zoom: 5,
        options: {
            styles: styles
        },
        markers: []
    }

    constructor(props) {
        super(props)
        this.shouldComponentUpdate = shouldPureComponentUpdate
    }

    componentWillReceiveProps(nextProps) {
        const { center, zoom } = this.props
        if (nextProps.center != center || nextProps.zoom != zoom) {
            this.props.onCenterChange(center)
            this.props.onZoomChange(zoom)
        }
    }

    render() {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBB5V34f3crBWyutuwFCy73IzRCdIwqUrI' }}
                center={this.props.center}
                zoom={this.props.zoom}
                options={this.props.options}
                onChildClick={this.onChildClick}
                onChildMouseEnter={this.onChildMouseEnter}
                onChildMouseLeave={this.onChildMouseLeave}
                margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
                hoverDistance={30}
                distanceToMouse={customDistanceToMouse}
            >
                {this.renderMarkers()}
            </GoogleMapReact>
        )
    }

    @autobind
    renderMarkers() {
        const markers = this.props.markers &&
            this.props.markers.map((marker, index) => (
                <Marker
                    // required props
                    key={marker.id}
                    lat={marker.lat}
                    lng={marker.lng}
                    height={marker.height}
                    // any user props
                    showBallon={marker.id === this.props.showBalloonForMarker}
                    onCloseClick={this.onBalloonCloseClick}
                    renderMarkerContent={this.props.renderMarkerContent}
                    hintBackground={this.props.markerHintBackground}
                    scale={.65}
                    {...markerDescriptions[0]}
                    marker={marker}
                />
            ))

        return markers
    }

    onChildClick = (key, childProps) => {
        const markerId = childProps.marker.id
        const index = this.props.markers.findIndex((m) => m.id === markerId)
        const currentMarker = this.props.markers[index]

        if (this.props.onMarkerClick)
            this.props.onMarkerClick(currentMarker)
    }

    onChildMouseEnter = (key, childProps) => {
        const markerId = childProps.marker.id
        const index = this.props.markers.findIndex((m) => m.id === markerId)
        if (this.props.onMarkerHover)
            this.props.onMarkerHover(index)
    }

    onChildMouseLeave = (/* key, childProps */) => {
        if (this.props.onMarkerHover) {
            this.props.onMarkerHover(-1)
        }
    }

    onBalloonCloseClick = () => {
        if (this.props.onChildClick) {
            this.props.onChildClick(-1)
        }
    }
}