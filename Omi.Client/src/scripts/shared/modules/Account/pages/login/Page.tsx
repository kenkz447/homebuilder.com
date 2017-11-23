import * as React from 'react'

import { CreatePageWrap } from 'shared/core'
import { AnimateLogo } from '../../components'
import { LAYOUT_BLANK } from '../../settings'

import { LOGIN } from './keys'

import { LoginForm } from './containers/LoginForm'

@(CreatePageWrap({ pageKey: LOGIN, layoutType: LAYOUT_BLANK }))
class Page extends React.Component {
    render() {
        return (
            <div id="loginPage">
                <div className="mt-5">
                    <AnimateLogo/>
                </div>
                <LoginForm />
            </div>
        )
    }
}

export default Page