import * as React from 'react'
import { Col } from 'antd'

import { CreatePageWrap } from 'shared/core'

import { PACKAGE_INDEX, LAYOUT_PACKAGE_MASTER } from '../../../settings'
import { HBTable } from '../../../containers'

const WithPageWrap = CreatePageWrap({
    pageKey: PACKAGE_INDEX,
    layoutType: LAYOUT_PACKAGE_MASTER
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