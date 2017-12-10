import * as React from 'react'
import { Select } from 'antd'
import { PackageProductViewModel, ProductViewModel } from 'admin/Types'
import { autobind } from 'core-decorators'

interface Props {
    item: PackageProductViewModel
    onProductChange
    avaliableProduct: Array<ProductViewModel>
}

export class SelectBox extends React.Component<Props, any> {
    state = {
        filterResult: []
    }

    render() {
        const product = this.state.filterResult.length ? this.state.filterResult : this.props.avaliableProduct
        return (
            <Select showSearch filterOption={false}
                value={this.props.item.productId as any} onChange={this.props.onProductChange} onSearch={this.onSearch}>
                {product.map((o) => {
                    return (<Select.Option key={o.entityId} value={o.entityId}>{o.title}</Select.Option>)
                })}
            </Select>
        )
    }

    @autobind
    onSearch(e: string) {
        const searchValue = e.toLowerCase()
        const filterResult = this.props.avaliableProduct.filter(o => o.title.toLowerCase().includes(e) || e.includes(o.title.toLowerCase()))
        this.setState({ filterResult })
    }
}