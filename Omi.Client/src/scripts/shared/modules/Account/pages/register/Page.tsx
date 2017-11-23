import * as React from 'react'

import { CreatePageWrap } from 'shared/core'
import { AnimateLogo } from '../../components'
import { LAYOUT_BLANK } from '../../settings'

import { PAGE } from './keys'
import { RegisterForm } from './containers/RegisterForm'

@(CreatePageWrap({ pageKey: PAGE, layoutType: LAYOUT_BLANK }))
class Page extends React.Component {
    render() {
        return (
            <div id="registerPage">
                <div className="mt-5">
                    <AnimateLogo/>
                </div>
                <RegisterForm/>
            </div>
        )
    }
}

export default Page