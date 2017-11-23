import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, match } from 'react-router'
import { Row, Col } from 'antd'

import { RequestSend, ExtractImmutableHOC } from '../../../../shared/core'
import { WebsiteRootState } from '../../../Types'
import { Carousel } from '../../../components/components'
import { PackageViewModel } from '../../../../admin'
import { PageEntityViewModel, toCurrency } from '../../../../shared/modules/website'
import { ConnectedNextAndPrevPackage } from './NextAndPrevPackage'

interface DispatchProps {
    getPackage: (packageName) => void
}

interface StateProps {
    package: PackageViewModel
    packagePage: PageEntityViewModel<PackageViewModel>
}

interface OwnProps {
    match?: match<{ packageName: string }>
}

class PackageComponent extends React.Component<StateProps & DispatchProps & OwnProps> {

    componentWillReceiveProps(nextProps: OwnProps) {
        if (this.props.match.url != nextProps.match.url)
            this.props.getPackage(nextProps.match.params.packageName)
    }

    componentWillMount() {
        this.props.getPackage(this.props.match.params.packageName)
    }

    render() {
        const packageToRender = this.props.package || this.getFetchedPackage()

        if (!packageToRender)
            return null

        return (
            <div className="package-detail">
                <div className="package-detail-header mb-5">
                    <div className="package-item-top">
                        <div className="clearfix">
                            <div className="float-left">
                                <h1 className="package-item-title">{packageToRender.title}</h1>
                            </div>
                            <div className="float-right">
                                <span className="package-item-price">VND {toCurrency(packageToRender.price)}</span>
                            </div>
                        </div>
                    </div>
                    <Carousel pictures={packageToRender.pictures} />
                </div>
                <Row>
                    <Col span={16}>
                        {this.renderProjectDescription(packageToRender)}
                        {this.renderWhatIncluded(packageToRender)}
                    </Col>
                </Row>
                <ConnectedNextAndPrevPackage packageId={packageToRender.id} />
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
                            <div className="package-detail-included-item">
                                <div className="package-detail-included-icon">
                                    <img src={`${o.icon}`} />
                                </div>
                                <label className="package-detail-included-label">{o.label}</label>
                            </div>
                        ))
                    }
                </div>
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
        package: state.data.getIn(['WEBSITE_VIEW_PACKAGE', 'response', 'result']),
        packagePage: state.data.getIn(['WEBSITE_PACKAGES', 'response', 'result']),
    }
}

const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
    return {
        getPackage: (packageName) => {
            const requestSendAction = RequestSend('WEBSITE_VIEW_PACKAGE', {
                url:`/package/GetPackage?packageName=${packageName}`
            })
            dispatch(requestSendAction)
        }
    }
}

const PackageComponentWithPureData = ExtractImmutableHOC(PackageComponent)
export const PackageDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(PackageComponentWithPureData))