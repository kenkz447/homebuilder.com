import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import { ExtractImmutableHOC, RequestSend, SetTempValue } from '../../../../../shared/core'
import { PageEntityViewModel, Pager, Transition } from '../../../../../shared/modules/website'
import { ProjectViewModel } from '../../../../../admin'
import { Image } from 'shared/modules/FileAndMedia'

import { WebsiteRootState } from '../../../../Types'

import { ProjectItem } from './project-list/ProjectItem'
import { push } from 'react-router-redux'
import { toCurrency } from 'shared/modules/website/utilities';
import { NavLink } from 'react-router-dom';

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
        const items = this.props.projectPage.entities

        return (
            <Transition>
                <div className="mb-3"><h2><b>Nearby Projects</b></h2></div>
                <ul className="project-list">
                    {items.map(o => {
                        return (
                            <li key={o.projectId} className="project-list-item clearfix">
                                <div className={'project-list-item-container'}>
                                    <div className="project-list-item-avatar">
                                        <Image className="d-block mw-100 w-100" fileEntityInfo={o.avatar} />
                                    </div>
                                    <div className="project-list-item-details">
                                        <label className="project-list-item-text">{o.title}</label>
                                        <span className="project-list-item-label">VND {toCurrency(o.budgetMin)} | {toCurrency(o.budgetMax)}</span>
                                        <span className="project-list-item-text">{o.city.label} | {o.projectType.label}</span>
                                    </div>
                                    <NavLink className="project-list-item-viewmore-btn" aria-current="false" to={`/${o.name}`}>
                                        <div className="project-list-item-viewmore">
                                            <span className="project-list-item-viewmore-text">View More</span>
                                            <span className="project-list-item-viewmore-icon">
                                                <i className="anticon anticon-caret-right"></i>
                                            </span>
                                        </div>
                                    </NavLink>
                                </div>
                            </li>
                        )
                    })}
                </ul>
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
                    id: project.projectId,
                    lat: project.mapLatitude,
                    lng: project.mapLongitude,
                    height: 250,
                    thumbnail: project.avatar,
                    title: project.title,
                    onClick: () => {
                        const toDetailAction = push(`/project/${project.name}`)
                        dispatch(toDetailAction)
                    }
                }
            })

            const setTempValueAction = SetTempValue('PROJECT_MARKERS', markers)
            dispatch(setTempValueAction)
        }
    }
}

const ProjectListWithPureData = ExtractImmutableHOC(ProjectListComponent)
export const ProjectList = connect(mapStateToProps, mapDispatchToProps)(ProjectListWithPureData)