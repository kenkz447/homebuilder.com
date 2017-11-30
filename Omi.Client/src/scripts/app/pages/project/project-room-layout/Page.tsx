import * as React from 'react'

import { CreatePageWrap } from '../../../../shared/core'
import { MAIN_MASTER } from '../../../layout'

import { PROJECT_ROOM_LAYOUT } from './keys'
import { ConnectedProjectDetail } from './containers/ProjectDetail'
@(CreatePageWrap({ pageKey: PROJECT_ROOM_LAYOUT, layoutType: MAIN_MASTER }))
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