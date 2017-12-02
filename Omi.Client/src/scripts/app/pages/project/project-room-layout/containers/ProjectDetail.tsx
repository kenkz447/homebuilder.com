import * as React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { ProjectViewModel } from '../../../../../admin'
import { WebsiteRootState } from '../../../../Types'

import { Image } from 'shared/modules/FileAndMedia'
import * as classNames from 'classnames'
import { SetTempValue, ExtractImmutableHOC, RequestSend } from 'shared/core'
import { Transition } from 'shared/modules/website'
import { PackageViewModel } from 'admin/Types'
import { PackageItem } from './PackageItem'

interface DispatchProps {
    getProject?: () => void
    getPackages?: (ids) => void
    setActiveRoomType?: (roomTypeId: number) => void
}

interface StateProps {
    project?: ProjectViewModel
    packages?: Array<PackageViewModel>
    activeRoomType?: number
    getPackagesResultCode?: string
}

interface OwnProps {
    match: any
}

class ProjectRoomLayoutDetail extends React.Component<OwnProps & StateProps & DispatchProps> {

    componentWillMount() {
        this.props.getProject()
    }

    componentWillReceiveProps(nextProps: OwnProps & StateProps) {
        if (nextProps.project && nextProps.getPackagesResultCode !== 'POST_SUCCEEDED') {
            const currentRoomTypeId = +nextProps.match.params.roomType
            const currentRoomType = nextProps.project.projectBlocks.find((o) => o.id == currentRoomTypeId)

            const currentLayoutId = +nextProps.match.params.layout
            const currentLayout = currentRoomType.children.find((o) => o.id == currentLayoutId)

            this.props.getPackages(currentLayout.children.filter(o => !!o.packageId).map((o) => o.packageId))
        }
    }

    render() {
        if (!this.props.project)
            return null

        const currentRoomTypeId = +this.props.match.params.roomType
        const currentRoomType = this.props.project.projectBlocks.find((o) => o.id == currentRoomTypeId)

        const currentLayoutId = +this.props.match.params.layout
        const currentLayout = currentRoomType.children.find((o) => o.id == currentLayoutId)

        return (
            <div>
                <div className="project-details mb-5">
                    <Row>
                        <Col span={12}>
                            <div className="">
                                <Image className="mw-100 w-100 d-block" fileEntityInfo={currentLayout.layoutImage} />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="pt-5 pr-5 pb-5 pl-5">
                                <div>
                                    <h1 className="project-title">{currentLayout.label}</h1>
                                </div>
                                <div>
                                    <p><b>Diện tích:</b> <span>{currentLayout.area}</span> m<sup>2</sup></p>
                                    <p><b>Số phòng ngủ:</b> <span>{currentLayout.bedRoomCount}</span></p>
                                    <p><b>Toilet:</b> <span>{currentLayout.toiletCount}</span></p>
                                    <p><b>Số lượng căn:</b> <span>{currentLayout.totalRoomOfLayout} m<sup>2</sup></span></p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <div className="mb-4">
                        <label className="package-detail-section-label">Package furniture</label>
                    </div>
                    <Transition>
                        <Row className="package-list" gutter={30} >
                            {
                                this.props.packages && this.props.packages.map((item) => (
                                    <Col key={item.id} span={8}>
                                        <PackageItem package={item} />
                                    </Col>)
                                )
                            }
                        </Row>
                    </Transition>
                </div>
            </div>
        )
    }

    onRoomTypeClick = (layoutId) => (e) => {
        this.props.setActiveRoomType(layoutId)
    }
}

const ProjectDetailWithPureData = ExtractImmutableHOC(ProjectRoomLayoutDetail)

const mapStateToProps = (state: WebsiteRootState, ownProps) => {
    return {
        project: state.data.getIn(['WEBSITE_VIEW_PROJECT', 'response', 'result']),
        activeRoomType: state.temp.get('ACTIVE_ROOM_TYPE'),
        packages: state.data.getIn(['WEBSITE_VIEW_PROJECT_PACKAGES', 'response', 'result']),
        getPackagesResultCode: state.data.getIn(['WEBSITE_VIEW_PROJECT_PACKAGES', 'response', 'code']),
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
        getPackages: (packageIds) => {
            const search = new URLSearchParams()
            for (const packageId of packageIds)
                search.append('ids', packageId)
            
            const action = RequestSend('WEBSITE_VIEW_PROJECT_PACKAGES', {
                url: `/package/GetPackageByIds?${search.toString()}`
            })
            dispatch(action)
        },
        setActiveRoomType(roomTypeId) {
            const action = SetTempValue('ACTIVE_ROOM_TYPE', roomTypeId)
            dispatch(action)
        }
    }
}

export const ConnectedProjectDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDetailWithPureData))