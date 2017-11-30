import * as React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import { ProjectViewModel } from '../../../../../admin'
import { WebsiteRootState } from '../../../../Types'
import { ConnectedProjectPackageDetail } from './ProjectPackageDetail'
import { Image } from 'shared/modules/FileAndMedia'
import * as classNames from 'classnames'
import { SetTempValue, ExtractImmutableHOC, RequestSend } from 'shared/core'

interface DispatchProps {
    getProject?: () => void
    setActiveRoomType?: (roomTypeId: number) => void
}

interface StateProps {
    project?: ProjectViewModel
    activeRoomType?: number
}

interface OwnProps {

}

class ProjectDetail extends React.Component<OwnProps & StateProps & DispatchProps> {

    componentWillMount() {
        this.props.getProject()
    }

    render() {
        if (!this.props.project)
            return null

        return (
            <div>
                <div className="mb-5">
                    {this.renderDetails()}
                </div>
                <div className="location-and-sitemap mb-5">
                    <div className="title mb-3">Location & Site Maps</div>
                    <Row gutter={30}>
                        <Col span={12}>
                            <div className="location">
                                <div className="head-text">
                                    Location
                                </div>
                                <Image className="mw-100 w-100 d-block" fileEntityInfo={this.props.project.locationImage} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="sitemap">
                                <div className="head-text">
                                    Site maps
                                </div>
                                <Image className="mw-100 w-100 d-block" fileEntityInfo={this.props.project.siteMapImage} />
                            </div>
                        </Col>
                    </Row>
                </div>
                {this.renderRoomTypes()}
            </div>
        )
    }

    renderDetails() {
        return (
            <div className="project-details">
                <Row>
                    <Col span={12}>
                        <div className="">
                            <img className="mw-100 w-100 d-block" src={`${window.baseUrl}${this.props.project.avatar.src}`} />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="pt-5 pr-5 pb-5 pl-5">
                            <div>
                                <h1 className="project-title">{this.props.project.title}</h1>
                            </div>
                            <div>
                                <p><b>Loại dự án:</b> <span>{this.props.project.projectType.label}</span></p>
                                <p><b>Chủ đầu tư:</b> <span>{this.props.project.investor}</span></p>
                                <p><b>Vị trí:</b> <span>{this.props.project.street}</span></p>
                                <p><b>Quy mô diện tích:</b> <span>{this.props.project.area} m<sup>2</sup></span></p>
                                <p><b>Tổng số căn hộ: </b> <span>{this.props.project.totalApartment}</span></p>
                                <p><b>Năm Khởi công: </b> <span>{this.props.project.startedYear} </span></p>
                                <p><b>Website: </b><a href={this.props.project.website}>{this.props.project.website}</a></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

    renderRoomTypes() {
        if (!this.props.project.projectBlocks)
            return null

        let currentActiveRoomType = this.props.project.projectBlocks.find((o) => o.id == this.props.activeRoomType)
        if (!currentActiveRoomType)
            currentActiveRoomType = this.props.project.projectBlocks[0]

        return (
            <div className="room-types">
                <ul className="room-types-list mb-3">
                    {
                        this.props.project.projectBlocks.map((o, i) => {
                            const isActive = currentActiveRoomType && currentActiveRoomType.id == o.id
                            return (
                                <li className={classNames('room-types-list-item', { active: isActive == true })}>
                                    <a onClick={this.onRoomTypeClick(o.id)}>{o.label}</a>
                                </li>
                            )
                        })
                    }
                </ul>
                <Row gutter={30}>
                    {
                        currentActiveRoomType && currentActiveRoomType.children.map((o) => {

                            return (
                                <Col span={8}>
                                    <Link to={`${location.pathname}/${currentActiveRoomType.id}/${o.id}`}>
                                        <div className="head-text">
                                            {o.label}
                                        </div>
                                        <Image className="mw-100 w-100 d-block" fileEntityInfo={o.layoutImage} />
                                    </Link>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        )
    }

    onRoomTypeClick = (layoutId) => (e) => {
        this.props.setActiveRoomType(layoutId)
    }
}

const ProjectDetailWithPureData = ExtractImmutableHOC(ProjectDetail)

const mapStateToProps = (state: WebsiteRootState, ownProps) => {
    return {
        project: state.data.getIn(['WEBSITE_VIEW_PROJECT', 'response', 'result']),
        activeRoomType: state.temp.get('ACTIVE_ROOM_TYPE')
    }
}

const mapDispatchToProps = (dispatch, ownProps): DispatchProps => {
    return {
        getProject: () => {
            const project = ownProps.match.params.project
            const requestSendAction = RequestSend('WEBSITE_VIEW_PROJECT', {
                url: `/project/getProject?projectId=${project}`
            })
            dispatch(requestSendAction)
        },
        setActiveRoomType(roomTypeId) {
            const action = SetTempValue('ACTIVE_ROOM_TYPE', roomTypeId)
            dispatch(action)
        }
    }
}

export const ConnectedProjectDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDetailWithPureData))