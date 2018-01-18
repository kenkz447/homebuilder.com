import * as React from 'react'
import { CreatePageWrap } from 'shared/core'

import { BLOG_NEW, BLOG_LAYOUT_MASTER } from '../../../settings'
import { BlogFormNew } from '../_shared/containers'

const WithPageWrap = CreatePageWrap({
    pageKey: BLOG_NEW,
    layoutType: BLOG_LAYOUT_MASTER
})

@(WithPageWrap as any)
class Page extends React.Component<any> {
    render() {
        return (
          <BlogFormNew />
        )
    }
}

export default Page