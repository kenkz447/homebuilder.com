import * as React from 'react'

import { CreatePageWrap } from 'shared/core'

import { PRODUCT_NEW, PRODUCT_LAYOUT_MASTER } from '../../../settings'
import { ProductFormUpdate } from '../_shared/containers'

const WithPageWrap = CreatePageWrap({
    pageKey: PRODUCT_NEW,
    layoutType: PRODUCT_LAYOUT_MASTER
})

@(WithPageWrap as any)
class Page extends React.Component<any> {
    render() {
        return (
            <ProductFormUpdate />
        )
    }
    getCurrentPack
}

export default Page