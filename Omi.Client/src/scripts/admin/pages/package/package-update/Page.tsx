import * as React from 'react'

import { CreatePageWrap } from 'shared/core'

import { PACKAGE_NEW, LAYOUT_PACKAGE_MASTER } from '../../../settings'
import { PackageFormUpdate } from '../_shared/containers'

const WithPageWrap = CreatePageWrap({
    pageKey: PACKAGE_NEW,
    layoutType: LAYOUT_PACKAGE_MASTER
})

@(WithPageWrap as any)
class Page extends React.Component<any> {
    render() {
        return (
            <PackageFormUpdate />
        )
    }
    getCurrentPack
}

export default Page