import * as React from 'react'
import * as classnames from 'classnames'
import { Row, Col } from 'antd'
import { autobind } from 'core-decorators'
import { connect } from 'react-redux'
import { SetTempValue } from '../../../../../shared/core'
import { ProjectBlockViewModel } from 'admin/Types'

interface OwnProps {
    projectBlock: ProjectBlockViewModel
}

export class LayoutSelect extends React.Component<OwnProps> {
    constructor(props: OwnProps) {
        super(props)
    }

    render() {
        if (!this.props.projectBlock)
            return
        
        return (
            <div className="project-layouts">
                <img className="mw-100" src={`${window.baseUrl}${this.props.projectBlock.layoutImage.src}`} />
                {
                    (this.props.projectBlock && this.props.projectBlock.layoutPoints) && (
                        this.props.projectBlock.layoutPoints.map((o) => {
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
        )
    }
}