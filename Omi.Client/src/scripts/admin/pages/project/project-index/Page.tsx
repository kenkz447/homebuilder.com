import * as React from 'react'
import { Col } from 'antd'

import { CreatePageWrap } from 'shared/core'

import { PROJECT_INDEX, LAYOUT_PROJECT_MASTER } from '../../../settings'
import { ProjectTable } from './containers/ProjectTable'

const WithPageWrap = CreatePageWrap({
    pageKey: PROJECT_INDEX,
    layoutType: LAYOUT_PROJECT_MASTER
})

@(WithPageWrap)
class Page extends React.Component {
    render() {
        return (
            <div>
                <ProjectTable/>
            </div>
        )
    }
}

export default Page