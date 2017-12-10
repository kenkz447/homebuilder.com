import * as React from 'react'
import { PackageProductViewModel, ProductViewModel, ModuleRootState } from 'admin/Types'
import { Select, Spin, Button, Input, Col, Row } from 'antd'
import { connect } from 'react-redux'
import { ExtractImmutableHOC, RequestSend } from 'shared/core'
import { autobind } from 'core-decorators'
import { SelectBox } from './SelectBox'

interface Stateprops {
    avaliableProduct: Array<ProductViewModel>
}

interface DispathProps {
    getAvaliableProduct: () => void
}

interface Props {
    id: string
    value: Array<PackageProductViewModel>
    onChange: (value) => void
}

class ProductSelect extends React.Component<Props & Stateprops & DispathProps> {
    static defaultProps = {
        value: [],
        avaliableProduct: []
    } as Props & Stateprops

    componentWillMount() {
        this.props.getAvaliableProduct()
    }

    render() {
        if (!this.props.avaliableProduct.length)
            return null
        return (
            <div className="product-select">
                <div className="product-select-add mb-3">
                    <Button onClick={this.onProductAdd}>Add product</Button>
                </div>
                <Row gutter={15}>
                    {this.props.value.map((o, i) => { return this.renderItem(o, i) })}
                </Row>
            </div>
        )
    }

    renderItem(item: PackageProductViewModel, index) {
        const selectedProductIds = this.props.value.map(o => o.productId)
        const avaliableProduct = this.props.avaliableProduct.filter(o => o.entityId == item.productId || selectedProductIds.indexOf(o.entityId) < 0)

        return (
            <Col key={index} span={4}>
                <div className="product-select-item mb-3">
                    <label className="product-select-label">Product</label>
                    <SelectBox item={item} onProductChange={this.onProductChange(index)} avaliableProduct={avaliableProduct} />
                    <div className="mb-2">
                        <label className="product-select-label">Quantity</label>
                        <Input type="number" value={item.quantity} onChange={this.onQuantityChange(index).bind(this)} disabled={!item.productId} />
                    </div>
                    <div>
                        <Button onClick={this.onItemRemove(index).bind(this)}>Remove</Button>
                    </div>
                </div>
            </Col>
        )
    }

    onItemRemove = (index) => () => {
        const newValue = this.props.value.concat([])
        newValue.splice(index, 1)
        this.props.onChange(newValue)
    }

    onProductChange = (index) => (value) => {
        const newValue = this.props.value.concat([])
        const product = newValue[index]
        product.productId = value

        this.props.onChange(newValue)
    }

    onQuantityChange = (index) => (e) => {
        const target = e.target

        const newValue = this.props.value.concat([])
        const product = newValue[index]
        product.quantity = target.value
        this.props.onChange(newValue)
    }

    @autobind
    onProductAdd() {
        const newValue = this.props.value.concat([])
        newValue.push({
            quantity: 1
        })
        this.props.onChange(newValue)
    }
}

const mapStateToProps = (state: ModuleRootState): Stateprops => {
    return {
        avaliableProduct: state.data.getIn(['AVALIABLE_PRODUCTS', 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch): DispathProps => {
    return {
        getAvaliableProduct: () => {
            const params = new URLSearchParams()
            params.append('getMode', String(2))

            const action = RequestSend('AVALIABLE_PRODUCTS', {
                url: `/product/get?${params.toString()}`
            })

            dispatch(action)
        }
    }
}

export const ConnectedProductSelect = connect(mapStateToProps, mapDispatchToProps)(ExtractImmutableHOC(ProductSelect))