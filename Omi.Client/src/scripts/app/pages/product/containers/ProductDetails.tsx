import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { RequestSend, ExtractImmutableHOC } from 'shared/core'

import { WebsiteRootState } from '../../../Types'
import { ProductViewModel } from 'admin/Types'
import { Row, Col } from 'antd'
import { Image } from 'shared/modules/FileAndMedia'
import { PackageViewModel } from 'src/scripts/admin'
import { NavLink } from 'react-router-dom'
import { Carousel } from 'app/components'
import { Transition } from 'shared/modules/website'

interface StateProps {
    product?: ProductViewModel
    package?: PackageViewModel
}

interface DispatchProps {
    getProduct?: (product) => void
    getPackage?: () => void
}

interface Params {
    packageName: string
    product: string
}

interface OwnProps extends RouteComponentProps<Params> {

}

class ProductDetails extends React.Component<OwnProps & DispatchProps & StateProps> {
    state = {
        currentImage: undefined
    }

    componentWillMount() {
        this.props.getProduct(this.props.match.params.product)
        this.props.getPackage()
    }

    componentWillReceiveProps(nextProps: OwnProps) {
        if (this.props.location.pathname != nextProps.location.pathname) {
            this.props.getProduct(nextProps.match.params.product)
            this.setState({ currentImage: null })
        }
    }

    render() {
        if (!this.props.package || !this.props.product)
            return null
        const quantity = this.props.package.products.find(o => o.productId == this.props.product.entityId)
        return (
            <Transition key={this.props.product.entityId} >
                <Row gutter={30}>
                    <Col span={24}>
                        {this.renderBreacrumb()}
                    </Col>
                    <Col span={8}>
                        {this.renderGallery()}
                    </Col>
                    <Col span={12}>
                        <div>
                            <h1>{this.props.product.title}</h1>
                            <label className="product-code">{this.props.product.code}</label>
                            <p>Quantity in package: {quantity.quantity}</p>
                            <p>Size: {this.props.product.dimension}</p>
                            <p>Branch: {this.props.product.brand.label}</p>
                            <p>Type: {this.props.product.type.label}</p>
                            <p className="product-description">Info: {this.props.product.description}</p>
                        </div>
                    </Col>
                    <Col span={24} className="pt-4">
                        <label className="product-others-label">Other products</label>
                        {this.renderOtherProducts()}
                    </Col>
                </Row>
            </Transition>
        )
    }

    renderBreacrumb() {
        return (
            <div className="breadcrumb-wrapper">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink className="breadcrumb-item-link" to={`/package/${this.props.package.id}`}>{this.props.package.title}</NavLink></li>
                    <li className="breadcrumb-item">/</li>
                    <li className="breadcrumb-item"><span className="breadcrumb-item-link breadcrumb-item-link-disabled">{this.props.product.title}</span></li>
                </ul>
            </div>
        )
    }

    renderOtherProducts() {
        const products = this.props.package.products.filter(o => o.productId != this.props.product.entityId)

        return (
            <Row gutter={5}>
                {
                    products.map(o => {
                        return (
                            <Col span={3}>
                                <NavLink className="product-others-product" to={o.productViewModel.name}>
                                    <Image className="w-100" fileEntityInfo={o.productViewModel.avatar} />
                                    <label className="product-others-product-label">{o.productViewModel.title}</label>
                                </NavLink>
                            </Col>
                        )
                    })
                }
            </Row>
        )
    }

    renderGallery() {
        const current = this.state.currentImage || this.props.product.avatar
        return (
            <>
            <Transition key={current.src} transitionName="fade">
                <Image containerClassName="product-gallery-current" className="w-100 product-gallery-current-image" fileEntityInfo={current} />
            </Transition>

            {
                this.props.product.pictures &&
                <Carousel pictures={this.props.product.pictures}
                    thumb={true}
                    slidesToShow={4}
                    itemClassName="product-gallery-item"
                    itemClick={(itemIndex) => {
                        this.setState({ currentImage: this.props.product.pictures[itemIndex] })
                    }}
                    containerClassName="product-gallery" />
            }
            </>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        product: state.data.getIn(['PRODUCT', 'response']),
        package: state.data.getIn(['WEBSITE_VIEW_PACKAGE', 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
    const packageName = ownProps.match.params.packageName
    return {
        getProduct: (product) => {
            const action = RequestSend('PRODUCT', {
                url: `/product/get?name=${product}`
            })
            dispatch(action)
        },
        getPackage: () => {
            const requestSendAction = RequestSend('WEBSITE_VIEW_PACKAGE', {
                url: `/package/GetPackage?packageName=${packageName}`
            })
            dispatch(requestSendAction)
        }
    }
}

export const ConnectedProductDetails = withRouter<any>(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ExtractImmutableHOC(ProductDetails)))