import * as React from 'react'
import { Row, Col } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { ExtractImmutableHOC, RequestSend } from '../../../../../shared/core'
import { ProjectViewModel } from '../../../../../admin'
import { WebsiteRootState } from '../../../../Types'
import { ConnectedLayoutSelect } from './LayoutSelect'
import { ConnectedProjectPackageDetail } from './ProjectPackageDetail'

interface DispatchProps {
    getProject?: () => void
}

interface StateProps {
    project?: ProjectViewModel
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
                <div className="mb-3">
                    <Row gutter={20} type="flex" justify="start">
                        <Col span={8}>
                            {this.renderDetails()}
                        </Col>
                        <Col span={16}>
                            {this.props.project.projectBlocks.length && <ConnectedLayoutSelect projectBlocks={this.props.project.projectBlocks} />}
                        </Col>
                    </Row>
                </div>
                <div>
                    {<ConnectedProjectPackageDetail />}
                </div>
            </div>
        )
    }

    renderDetails() {
        return (
            <div className="project-details">
                <div className="mb-3">
                    <img className="mw-100" src={`${window.baseUrl}${this.props.project.avatar.src}`} />
                </div>
                <div>
                    <h1 className="project-title">{this.props.project.title}</h1>
                </div>
                <div>
                    <p><b>Loại dự án:</b> <span>{this.props.project.projectType.label}</span></p>
                    <p><b>Chủ đầu tư:</b> <span>{this.props.project.invertor}</span></p>
                    <p><b>Vị trí:</b> <span>{this.props.project.street}</span></p>
                    <p><b>Quy mô diện tích:</b> <span>{this.props.project.area} m<sup>2</sup></span></p>
                    <p><b>Tổng số căn hộ: </b> <span>{this.props.project.totalApartment}</span></p>
                    <p><b>Năm Khởi công: </b> <span>{this.props.project.startedYear} </span></p>
                    <p><b>Website: </b><a href={this.props.project.website}>{this.props.project.website}</a></p>
                </div>
            </div>
        )
    }
}

const ProjectDetailWithPureData = ExtractImmutableHOC(ProjectDetail)

const mapStateToProps = (state: WebsiteRootState, ownProps) => {
    return {
        project: state.data.getIn(['WEBSITE_VIEW_PROJECT', 'response', 'result']),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProject: () => {
            const project = ownProps.match.params.project
            const requestSendAction = RequestSend('WEBSITE_VIEW_PROJECT', {
                url: `/project/getProject?projectId=${project}`
            })
            dispatch(requestSendAction)
        }
    }
}

export const ConnectedProjectDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDetailWithPureData))