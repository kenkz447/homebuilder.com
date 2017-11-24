import * as React from 'react'
import * as classnames from 'classnames'
import { Row, Col } from 'antd'
import { autobind } from 'core-decorators'
import { connect } from 'react-redux'
import { SetTempValue } from '../../../../../shared/core'

interface DispathProps {
    setPrjectSelectedPackage: (packageId) => void
}

interface OwnProps {
    projectBlocks: Array<any>
}
class LayoutSelect extends React.Component<OwnProps & DispathProps, any> {
    constructor(props: OwnProps & DispathProps) {
        super(props)

        this.state = {
            roomLayouts: props.projectBlocks[0].children,
            rooms: props.projectBlocks[0].children[0].children,
            room: props.projectBlocks[0].children[0].children[0],
        }
    }


    componentWillMount() {
        if (this.state.room)
            this.props.setPrjectSelectedPackage(this.state.room.packageId)
    }


    render() {
        return (
            <div className="project-layouts">
                <Row gutter={20}>
                    <Col span={8}>
                        <label>RoomType</label>
                        <select onChange={this.handeRoomTypeChange}>
                            {this.props.projectBlocks.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                        </select>
                    </Col>
                    <Col span={8}>
                        <label>RoomLayout</label>
                        <select onChange={this.handleRoomLayoutChange}>
                            {this.state.roomLayouts && this.state.roomLayouts.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                        </select>
                    </Col>
                    <Col span={8}>
                        <label>Room</label>
                        <select onChange={this.handleRoomChange}>
                            {this.state.rooms && this.state.rooms.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                        </select>
                    </Col>
                </Row>
                <div>
                    <img className="mw-100" src={`${window.baseUrl}${this.state.room.layoutImage.src}`} />
                    {
                        (this.state.room && this.state.room.layoutPoints) && (
                            this.state.room.layoutPoints.map((o) => {
                                return (
                                    <div key={o.id} className={'c-project-layout-arrow-wrapper hint--html hint--bottom'}
                                        style={{
                                            top: `${o.y}%`,
                                            left: `${o.x}%`
                                        }}>
                                        <div className={classnames('c-project-layout-arrow')}
                                            style={{
                                                transform: `rotate(${o.rotate}deg)`
                                            }}
                                        />
                                        <div className="c-project-layout-arrow-image hint__content">
                                            <img className="w-100 mw-100" src={`${window.baseUrl}${o.image.src}`} />
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        )
    }
    @autobind
    handeRoomTypeChange(e) {
        const target = e.target
        const currentRoomType = this.props.projectBlocks.find((o) => o.id == +target.value)

        const newState = {
            roomLayouts: currentRoomType.children,
            rooms: currentRoomType.children[0].children,
            room: currentRoomType.children[0].children[0]
        }
        this.setState(newState)
    }
    @autobind
    handleRoomLayoutChange(e) {
        const target = e.target
        const roomLayout = this.state.roomLayouts.find((o) => o.id == +target.value)

        const newState = {
            rooms: roomLayout[0].children,
        }
        this.setState(newState)
    }

    @autobind
    handleRoomChange(e) {
        const target = e.target
        const room = this.state.rooms.find((o) => o.id == +target.value)

        this.setState({ room }, () => {
            this.props.setPrjectSelectedPackage(room.packageId)
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPrjectSelectedPackage: (packageId) => {
            const getTempValuaAction = SetTempValue('PROJECT_SELECTED_PACKAGE', packageId)
            dispatch(getTempValuaAction)
        }
    }
}

export const ConnectedLayoutSelect = connect((state) => ({}), mapDispatchToProps)(LayoutSelect)