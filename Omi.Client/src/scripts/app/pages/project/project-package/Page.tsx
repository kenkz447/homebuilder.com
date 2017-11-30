import * as React from 'react'

import { CreatePageWrap } from '../../../../shared/core'
import { MAIN_MASTER } from '../../../layout'

import { PROJECT_PACKAGE } from './keys'
import { PackageDetail } from './containers/PackageDetail'
@(CreatePageWrap({ pageKey: PROJECT_PACKAGE, layoutType: MAIN_MASTER }))
class Page extends React.Component {
    render() {
        return (
            <div className="page project">
                <PackageDetail />
            </div>
        )
    }
}

export default Page