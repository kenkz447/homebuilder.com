import './style.scss'

import * as React from 'react'

import { CreatePageWrap } from '../../../shared/core'
import { MAIN_MASTER } from '../../layout'
import { ROUTE_NAME } from './keys' 
import { ConnectedContactInfo } from './containers/ContactInfo'
import { ConnectedContactMap } from './containers/ContactMap'

@(CreatePageWrap({ pageKey: ROUTE_NAME, layoutType: MAIN_MASTER }))
class Index extends React.Component {
    render() {
        return (
            <div className="home">
                <ConnectedContactInfo />
                <ConnectedContactMap />
            </div>
        )
    }
}

export default Index