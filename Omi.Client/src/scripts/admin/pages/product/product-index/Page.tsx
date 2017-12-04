import * as React from 'react'
import { Col } from 'antd'

import { CreatePageWrap } from 'shared/core'

import { PRODUCT_INDEX, PRODUCT_LAYOUT_MASTER } from '../../../settings'
import { ProductTable } from './containers/ProductTable'

const WithPageWrap = CreatePageWrap({
    pageKey: PRODUCT_INDEX,
    layoutType: PRODUCT_LAYOUT_MASTER
})

@(WithPageWrap)
class Page extends React.Component {
    render() {
        return (
            <div>
                <ProductTable />
            </div>
        )
    }
}

export default Page