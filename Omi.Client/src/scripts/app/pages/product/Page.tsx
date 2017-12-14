import * as React from 'react'

import { CreatePageWrap } from '../../../shared/core'
import { MAIN_MASTER } from '../../layout'
import { ConnectedProductDetails } from './containers/ProductDetails'

@(CreatePageWrap({ pageKey: 'PRODUCT', layoutType: MAIN_MASTER }))
class Page extends React.Component {
    render() {
        return (
            <div className="page project">
                <ConnectedProductDetails />    
            </div>
        )
    }
}

export default Page