import * as React from 'react'

import { CreatePageWrap } from 'shared/core'
import { MAIN_MASTER } from '../../layout/keys'
import { ROUTE_NAME } from './keys'

@(CreatePageWrap({ pageKey: ROUTE_NAME, layoutType: MAIN_MASTER }))
class Index extends React.Component {
    render() {
        return (
            <div className="home">
            </div>
        )
    }
}

export default Index 