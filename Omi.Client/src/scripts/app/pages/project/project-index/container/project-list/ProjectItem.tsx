import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'antd'

import { ProjectViewModel } from '../../../../../../admin'
import { toCurrency } from '../../../../../../shared/modules/website'

interface OwnProps {
    project: ProjectViewModel
}
export const ProjectItem = (props: OwnProps) => {
    return (
        <div className="project-item mb-4">
            <NavLink className="project-link" to={`/project/${props.project.id}`}>
                <div className="package-item-top">
                    <div className="clearfix">
                        <div className="float-left">
                            <span className="package-item-title">{props.project.title}</span>
                        </div>
                    </div>
                </div>
                {
                    <div className="effect">
                        <figure className="effect-jazz">
                            <img src={`${window.baseUrl}${props.project.avatar.src}`} />
                            <figcaption className="d-flex justify-content-center align-items-center">
                                <p>
                                    View this project
                                    <br />
                                    <Icon type="right-circle-o" />
                                </p>
                            </figcaption>
                        </figure>
                    </div>
                }
            </NavLink>
        </div>
    )
}
