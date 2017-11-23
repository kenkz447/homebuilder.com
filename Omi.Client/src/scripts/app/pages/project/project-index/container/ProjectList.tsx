import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import { ExtractImmutableHOC, RequestSend, SetTempValue } from '../../../../../shared/core'
import { PageEntityViewModel,Pager, Transition } from '../../../../../shared/modules/website'
import { ProjectViewModel } from '../../../../../admin'

import { WebsiteRootState } from '../../../../Types'

import { ProjectItem } from './project-list/ProjectItem'

interface DispatchProps {
    getProjects: () => void
    loadMapMakers: (projects: Array<ProjectViewModel>) => void
}
interface StateProps {
    projectPage: PageEntityViewModel<ProjectViewModel>
    search: string
}

const ProjectListPager = Pager('pager')

class ProjectListComponent extends React.Component<StateProps & DispatchProps> {
    componentWillReceiveProps(nextProps: StateProps) {
        if (this.props.search != nextProps.search)
            this.props.getProjects()
        
        if (nextProps.projectPage)
            this.props.loadMapMakers(nextProps.projectPage.entities)    
    }

    componentWillMount() {
        this.props.getProjects()
    }

    render() {
        if (!this.props.projectPage)
            return null

        return (
            <Transition>
                <div className="mb-3"><h2><b>Nearby Projects</b></h2></div>
                <Row className="project-list" gutter={30} >
                    {
                        this.props.projectPage && this.props.projectPage.entities.map((item) => (
                            <Col key={item.id} span={8}>
                                <ProjectItem project={item} />
                            </Col>)
                        )
                    }
                    {
                        this.props.projectPage.entities.length &&
                        <Col span={24}>
                            <div className="clearfix">
                                <div className="float-right">
                                    <ProjectListPager baseURL={new URL(location.href)}  {...this.props.projectPage.pager} />
                                </div>
                            </div>
                        </Col>
                    }

                </Row>
            </Transition>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        projectPage: state.data.getIn(['WEBSITE_PROJECT', 'response', 'result']),
        search: state.router.location.search
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getProjects: () => {
            const requestSendAction = RequestSend('WEBSITE_PROJECT', {
                url: `/project/getProjects${location.search}`
            })
            dispatch(requestSendAction)
        },
        loadMapMakers: (projects) => {
            const markers = projects.filter((o) => o.mapLatitude).map((project) => {
                return {
                    id: project.id,
                    lat: project.mapLatitude,
                    lng: project.mapLongitude,
                    height: 100,
                    thumbnail: project.avatar.src
                }
            })

            const setTempValueAction = SetTempValue('PROJECT_MARKERS', markers)
            dispatch(setTempValueAction)
        }
    }
}

const ProjectListWithPureData = ExtractImmutableHOC(ProjectListComponent)
export const ProjectList = connect(mapStateToProps, mapDispatchToProps)(ProjectListWithPureData)