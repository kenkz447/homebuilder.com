import * as React from 'react'
import { Row, Col } from 'antd'

import { CreatePageWrap } from '../../../shared/core'
import { MAIN_MASTER } from '../../layout'

import { ROUTE_NAME } from './keys'
import { PackageDetail } from './containers/PackageDetail'

@(CreatePageWrap({ pageKey: ROUTE_NAME, layoutType: MAIN_MASTER }))
class Page extends React.Component {
    render() {
        return (
            <div className="page">
                <PackageDetail />
            </div>
        )
    }
}

export default Page