import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, match } from 'react-router'
import { Row, Col } from 'antd'
import * as FacebookProvider from 'react-facebook'
import { NavLink } from 'react-router-dom'

import { RequestSend, ExtractImmutableHOC, SetTempValue } from 'shared/core'
import { WebsiteRootState } from '../../../../Types'
import { Carousel } from '../../../../components/components'
import { PackageViewModel } from '../../../../../admin'
import { PageEntityViewModel, toCurrency } from 'shared/modules/website'
import { ProjectViewModel } from 'admin/Types'
import { LayoutSelect } from './LayoutSelect'
import * as classNames from 'classnames'

import { ConnectedLightbox } from './LightBox'
import { QuotationDetail } from './QuotationDetail'

import './style.scss'

interface DispatchProps {
    getPackage: () => void
    getProject: () => void
    openLightBox?: (imageId) => void
}

interface StateProps {
    package: PackageViewModel
    project?: ProjectViewModel
    packagePage: PageEntityViewModel<PackageViewModel>
}

interface OwnProps {
    match?: match<{ packageName: string, layout: string, project: string, roomType: string }>
}

class PackageComponent extends React.Component<StateProps & DispatchProps & OwnProps> {
    componentWillMount() {
        this.props.getProject()
        this.props.getPackage()
    }

    render() {
        const packageToRender = this.props.package || this.getFetchedPackage()

        if (!packageToRender || !this.props.project)
            return null

        const currentRoomTypeId = +this.props.match.params.roomType
        const currentRoomType = this.props.project.projectBlocks.find((o) => o.id == currentRoomTypeId)

        const currentLayoutId = +this.props.match.params.layout
        const currentLayout = currentRoomType.children.find((o) => o.id == currentLayoutId)

        const currentPerspective = currentLayout.children.find((o) => o.id == packageToRender.projectBlockId)

        const pictures = currentPerspective && currentPerspective.layoutPoints.map((o) => o.image) || []
        return (
            <div className="package-detail">
                {
                    currentPerspective && (
                        <div className="breadcrumb-wrapper">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink className="breadcrumb-item-link" to={`/project/${this.props.project.name}`}>Project</NavLink></li>
                                <li className="breadcrumb-item">/</li>
                                <li className="breadcrumb-item"><NavLink className="breadcrumb-item-link" to={`/project/${this.props.project.name}/${currentRoomTypeId}/${currentLayoutId}`}>A2-1404</NavLink></li>
                                <li className="breadcrumb-item">/</li>
                                <li className="breadcrumb-item"><span className="breadcrumb-item-link breadcrumb-item-link-disabled">{currentPerspective.label}</span></li>
                            </ul>
                        </div>
                    )
                }
                <div className="project-layouts mb-2">
                    <img className="mw-100" src={`${window.baseUrl}${currentLayout.layoutImage.src}`} />
                    {
                        (currentPerspective && currentPerspective.layoutPoints) && (
                            currentPerspective.layoutPoints.map((o, i) => {
                                return (
                                    <div key={i} className={'c-project-layout-arrow-wrapper hint--html hint--bottom'}
                                        style={{
                                            top: `${o.y}%`,
                                            left: `${o.x}%`
                                        }}>
                                        <div className={classNames('c-project-layout-arrow')}
                                            style={{
                                                transform: `rotate(${o.rotate}deg)`
                                            }}
                                            onClick={() => { this.props.openLightBox(i) }}
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
                <div className="slick-multi-wrapper mb-5">
                    <Carousel pictures={pictures}
                        slidesToShow={4}
                        itemClassName="slick-multi-item"
                        itemClick={(itemIndex) => { this.props.openLightBox(itemIndex) }}
                        containerClassName="slick-multi" />
                </div>
                {this.renderProjectDescription(packageToRender)}
                {this.renderWhatIncluded(packageToRender)}
                <ConnectedLightbox images={pictures} />
            </div>
        )
    }

    renderProjectDescription(renderPackage: PackageViewModel) {
        return (
            <section className="package-detail-section mb-5">
                <label className="package-detail-section-label">Package Description</label>
                <div className="package-detail-section-details">
                    <p><span>Design Theme: </span> <span>{renderPackage.designThemeLabel}</span></p>
                    <p><span>House Type: </span> <span>{renderPackage.houseTypeLabel}</span></p>
                    <p><span>Area: </span><span>{renderPackage.area} m<sup>2</sup></span></p>
                    <p><span>Intro: </span> <span>{renderPackage.sortText}</span></p>
                </div>
                <button className="package-contact-us-button">Contact Us</button>
            </section>
        )
    }

    renderWhatIncluded(renderPackage: PackageViewModel) {
        return (
            <div className="package-detail-section package-detail-included mb-5">
                <label className="package-detail-section-label">What's include in this Package</label>
                <div className="clearfix pt-2">
                    {
                        renderPackage.packageIncludedItems && renderPackage.packageIncludedItems.map((o) => (
                            <div key={o.id} className="package-detail-included-item">
                                <div className="package-detail-included-icon">
                                    <img src={`${window.baseUrl}${o.icon}`} />
                                </div>
                                <label className="package-detail-included-label">{o.label}</label>
                            </div>
                        ))
                    }
                </div>
                <hr className="mt-3 mb-3" />
                <div className="clearfix mb-3">
                    {
                        renderPackage.packageFurnitureIncludedItems && renderPackage.packageFurnitureIncludedItems.map((o) => (
                            <div key={o.id} className="package-detail-included-item">
                                <div className="package-detail-included-icon">
                                    <img src={`${window.baseUrl}${o.icon}`} />
                                </div>
                                <label className="package-detail-included-label">{o.label}</label>
                            </div>
                        ))
                    }
                </div>
                <div className="mb-5">
                    <QuotationDetail items={renderPackage.products} />
                </div>
                <FacebookProvider.default appId="1925738257700931">
                    <FacebookProvider.Comments href={window.location} width="100%" />
                </FacebookProvider.default>
            </div>
        )
    }

    getFetchedPackage() {
        if (!this.props.packagePage)
            return

        const packageId = +this.props.match.params.packageName
        return this.props.packagePage.entities.find((o) => o.id == packageId)
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        project: state.data.getIn(['WEBSITE_VIEW_PROJECT', 'response', 'result']),
        package: state.data.getIn(['WEBSITE_VIEW_PACKAGE', 'response', 'result']),
        packagePage: state.data.getIn(['WEBSITE_PACKAGES', 'response', 'result']),
    }
}

const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
    return {
        getPackage: () => {
            const packageName = ownProps.match.params.packageName
            const requestSendAction = RequestSend('WEBSITE_VIEW_PACKAGE', {
                url: `/package/GetPackage?packageName=${packageName}`
            })
            dispatch(requestSendAction)
        },
        getProject: () => {
            const project = ownProps.match.params.project
            const requestSendAction = RequestSend('WEBSITE_VIEW_PROJECT', {
                url: `/project/GetProjectByName?projectName=${project}`
            })
            dispatch(requestSendAction)
        },
        openLightBox: (fileIndex) => {
            dispatch(SetTempValue('PROJECT_PACKGE_PHOTO_INDEX', fileIndex))
        }
    }
}

const PackageComponentWithPureData = ExtractImmutableHOC(PackageComponent)
export const PackageDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(PackageComponentWithPureData))