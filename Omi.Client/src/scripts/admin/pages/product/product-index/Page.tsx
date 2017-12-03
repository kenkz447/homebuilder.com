import * as React from 'react'
import { Col } from 'antd'

import { CreatePageWrap } from 'shared/core'

import { PRODUCT_INDEX, LAYOUT_PRODUCT_MASTER } from '../../../settings'
import { HBTable } from '../../../containers'

const WithPageWrap = CreatePageWrap({
    pageKey: PRODUCT_INDEX,
    layoutType: LAYOUT_PRODUCT_MASTER
})

@(WithPageWrap)
class Page extends React.Component {
    render() {
        return (
            <div>
                <HBTable/>
            </div>
        )
    }
}

export default Page