import * as React from 'react'
import { Collapse } from 'antd'
import { PackageProductViewModel } from 'admin/Types'
import { ProductList } from 'app/pages/package/containers/ProductList'
import { toCurrency } from 'shared/modules/website'

interface Props {
    items: Array<PackageProductViewModel>
}

function QuotationDetail(props: Props) {
    let total = 0
    for (const item of props.items) {
        total += item.quantity * item.productViewModel.price
    }

    return (
        <Collapse className="package-quotation-detail" bordered={false} defaultActiveKey={['1']}>
            <Collapse.Panel header={<label className="package-detail-section-label">What's include in this Package<span className="package-quotation-detail-total">Tổng: {toCurrency(total)} vnd</span></label>} key="1">
                <ProductList items={props.items} />
            </Collapse.Panel>
        </Collapse>
    )
}

QuotationDetail['defaultProps'] = {
    items: []
}

export { QuotationDetail }