import * as React from 'react'

import { CreatePageWrap } from '../../../shared/core'
import { BASE_MASTER } from '../../settings'
import { routeName } from './keys'

import { ConnectedWebsiteSettingForm } from './containers/WebsiteSettingForm'

@(CreatePageWrap({ pageKey: routeName, layoutType: BASE_MASTER }))
class Page extends React.Component {
    render() {
        return (
            <div className="page">
                <ConnectedWebsiteSettingForm />
            </div>
        )
    }
}

export default Page