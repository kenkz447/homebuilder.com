import * as React from 'react'
import { Col } from 'antd'

import { CreatePageWrap } from 'shared/core'

import { PRODUCT_INDEX, PRODUCT_LAYOUT_MASTER } from '../../../settings'
import { ProductTable } from './containers/ProductTable'
import { UploadExcel } from './containers/UploadExcel'
import { ConnectedExportExcel } from './containers/ExportExcel'

const WithPageWrap = CreatePageWrap({
    pageKey: PRODUCT_INDEX,
    layoutType: PRODUCT_LAYOUT_MASTER
})

@(WithPageWrap)
class Page extends React.Component {
    render() {
        return (
            <div>
                <div className="clearfix mb-3">
                    <div className="float-left mr-3">
                        <UploadExcel />
                    </div>
                    <div className="float-left">
                        <ConnectedExportExcel />
                    </div>
                </div>
                <ProductTable />
            </div>
        )
    }
}

export default Page