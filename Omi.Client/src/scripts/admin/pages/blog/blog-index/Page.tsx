import * as React from 'react'
import { Col } from 'antd'

import { CreatePageWrap } from 'shared/core'

import { BLOG_INDEX, BLOG_LAYOUT_MASTER } from '../../../settings'
import { BlogTable } from './containers/BlogTable'

const WithPageWrap = CreatePageWrap({
    pageKey: BLOG_INDEX,
    layoutType: BLOG_LAYOUT_MASTER
})

@(WithPageWrap)
class Page extends React.Component {
    render() {
        return (
            <div>
                <BlogTable />
            </div>
        )
    }
}

export default Page