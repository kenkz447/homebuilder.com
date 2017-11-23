import * as React from 'react'

import { CreatePageWrap } from '../../../../shared/core'
import { MAIN_MASTER } from '../../../layout'

import { WEBSITE_PROJECT_DETAIL } from './keys'
import { ConnectedProjectDetail } from './containers/ProjectDetail'
@(CreatePageWrap({ pageKey: WEBSITE_PROJECT_DETAIL, layoutType: MAIN_MASTER }))
class Page extends React.Component {
    render() {
        return (
            <div className="page project">
                <ConnectedProjectDetail />
            </div>
        )
    }
}

export default Page