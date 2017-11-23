import * as React from 'react'
import { CreatePageWrap } from 'shared/core'

import { PACKAGE_NEW, LAYOUT_PACKAGE_MASTER } from '../../../settings'
import { PackageFormNew } from '../_shared/containers'

const WithPageWrap = CreatePageWrap({
    pageKey: PACKAGE_NEW,
    layoutType: LAYOUT_PACKAGE_MASTER
})

@(WithPageWrap as any)
class Page extends React.Component<any> {
    render() {
        return (
          <PackageFormNew />
        )
    }
}

export default Page