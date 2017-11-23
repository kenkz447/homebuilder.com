import * as React from 'react'
import * as controllable from 'react-controllables'
import * as classnames from 'classnames'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
    getHintBaloonHorizontalPosStyle,
    getHintBaloonVerticalPosClass,
    getHintBottomOffsetClass,
} from './helpers/balloon-pos'
import { getMarkerHolderStyle, getMarkerStyle, getMarkerTextStyle } from './helpers/marker-styles'

const K_HINT_HTML_DEFAULT_Z_INDEX = 1000000
const K_SCALE_HOVER = 1
const K_SCALE_NORMAL = 0.65
const K_MIN_CONTRAST = 0.4

function calcMarkerMarkerStyle(scale, zIndexStyle, markerStyle, imageStyle) {
    const contrast = K_MIN_CONTRAST + (1 - K_MIN_CONTRAST) * Math.min(scale / K_SCALE_NORMAL, 1)

    return {
        transform: `scale(${scale} , ${scale})`,
        WebkitTransform: `scale(${scale} , ${scale})`,
        filter: `contrast(${contrast})`,
        WebkitFilter: `contrast(${contrast})`,
        ...markerStyle,
        ...zIndexStyle,
        ...imageStyle
    }
}

function calcMarkerTextStyle(scale, markerTextStyle) {
    const K_MAX_COLOR_VALUE = 0
    const K_MIN_COLOR_VALUE = 8
    const colorV = Math.ceil(K_MIN_COLOR_VALUE + (K_MAX_COLOR_VALUE - K_MIN_COLOR_VALUE) * Math.min(scale / K_SCALE_NORMAL, 1))
    const colorHex = colorV.toString(16)
    const colorHTML = `#${colorHex}${colorHex}${colorHex}`

    return {
        ...markerTextStyle,
        color: colorHTML
    }
}

@controllable(['hoverState', 'showBallonState'])
export class Marker extends React.Component<any> {
    static defaultProps = {
        scale: K_SCALE_NORMAL,
        hoverState: false,
        showBallonState: false,
        withText: false,
        size: { width: 62, height: 60 },
        origin: { x: 15 / 62, y: 1 },
        imageClass: 'map-marker__marker--big',
        hintType: 'hint--info'
    }

    alive = true

    constructor(props) {
        super(props)
        this.shouldComponentUpdate = shouldPureComponentUpdate
    }

    componentWillUnmount() {
        this.alive = false
    }
    componentDidUpdate(prevProps) {
        const K_TRANS_DELAY = 30

        if (prevProps.$hover !== this.props.$hover)
            setTimeout(() => this.onHoverStateChange(this.props.$hover), K_TRANS_DELAY)

        if (prevProps.showBallon !== this.props.showBallon)
            setTimeout(() => this.onShowBallonStateChange(this.props.showBallon), K_TRANS_DELAY)
    }

    // no optimizations at all
    render() {
        const scale = this.props.$hover || this.props.showBallon ? K_SCALE_HOVER : K_SCALE_NORMAL
        const markerHolderStyle = getMarkerHolderStyle(this.props.size, this.props.origin)
        const markerStyle = getMarkerStyle(this.props.size, this.props.origin)

        const zIndexStyle = {
            zIndex: Math.round(scale * 10000) - (this.props.showBallon ? 20 : 0) + (this.props.$hover ? K_HINT_HTML_DEFAULT_Z_INDEX : 0)
        }

        const textStyleDef = getMarkerTextStyle()
        const textStyle = calcMarkerTextStyle(scale, textStyleDef)

        const showHint = this.props.hoverState || this.props.showBallonState

        // baloon position calc
        const mapWidth = this.props.$geoService.getWidth()
        const mapHeight = this.props.$geoService.getHeight()
        const markerDim = this.props.$getDimensions(this.props.$dimensionKey)

        const hintBaloonHorizontalPosStyle = getHintBaloonHorizontalPosStyle(markerDim.x, this.props.size.width, this.props.origin.x, mapWidth)
        if (this.props.hintBackground)
            hintBaloonHorizontalPosStyle.background = this.props.hintBackground

        const hintBaloonVerticalPosClass = getHintBaloonVerticalPosClass(markerDim.y, mapHeight, this.props.height)
        const hintBalloonBottomOffsetClass = getHintBottomOffsetClass(this.props.size.width, this.props.origin.x)

        // set baloon position at first and then animate (it must be some lib for react animations)
        const noTransClass = this.props.$hover === true && this.props.hoverState !== true ? 'hint--notrans' : ''
        const noTransBalloonClass = this.props.showBallon === true && this.props.showBallonState !== true ? 'hint--notrans' : ''

        const imageClass = this.props.image ? '' : this.props.imageClass
        const imageStyle = this.props.image ? {
            backgroundImage: `url(${this.props.image})`
        } : null

        const styleMarkerMarker = calcMarkerMarkerStyle(scale, zIndexStyle, markerStyle, imageStyle)

        // css hints library https://github.com/istarkov/html-hint
        return (
            <div style={markerHolderStyle as any}
                className={classnames('map-marker hint hint--html',
                    this.props.hintType,
                    hintBalloonBottomOffsetClass,
                    noTransClass, noTransBalloonClass, hintBaloonVerticalPosClass,
                    this.props.showBallon ? 'hint--balloon' : '',
                    showHint ? 'hint--always' : 'hint--hidden')}
            >
                <div
                    style={styleMarkerMarker}
                    className={classnames('map-marker__marker', imageClass)}>
                    {
                        this.props.withText ?
                            <div style={textStyle}>
                                {this.props.marker.number}
                            </div>
                            :
                            <div />
                    }
                </div>
                <div style={hintBaloonHorizontalPosStyle} className={classnames('hint__content map-marker-hint', this.props.showBallon ? '' : 'noevents')}>
                    { this.props.renderMarkerContent && this.props.renderMarkerContent(this.props.marker) }
                </div>
            </div>
        )
    }

    onShowBallonStateChange = (...args) => {
        if (!this.alive)
            return
        this.props.onShowBallonStateChange(...args)
    }

    onHoverStateChange = (...args) => {
        if (!this.alive)
            return
        this.props.onHoverStateChange(...args)
    }

    onCloseClick = () => {
        if (this.props.onCloseClick)
            this.props.onCloseClick()
    }
}