import * as React from 'react'
import { CreatePageWrap } from 'shared/core'

import { PRODUCT_NEW, PRODUCT_LAYOUT_MASTER } from '../../../settings'
import { ProductFormNew } from '../_shared/containers'

const WithPageWrap = CreatePageWrap({
    pageKey: PRODUCT_NEW,
    layoutType: PRODUCT_LAYOUT_MASTER
})

@(WithPageWrap as any)
class Page extends React.Component<any> {
    render() {
        return (
          <ProductFormNew />
        )
    }
}

export default Page