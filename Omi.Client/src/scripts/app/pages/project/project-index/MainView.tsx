import * as React from 'react'
import { Row, Col } from 'antd'

import { CreatePageWrap } from '../../../../shared/core'
import { MAIN_MASTER } from '../../../layout'

import { WEBSITE_PROJECT_INDEX } from './keys'
import { Filter } from './container/Filter'
import { ProjectList } from './container/ProjectList'
import { ProjectMap } from './container/Map'

@(CreatePageWrap({ pageKey: WEBSITE_PROJECT_INDEX, layoutType: MAIN_MASTER }))
class Page extends React.Component {
    render() {
        return (
            <div className="page">
                <Filter />
                <div className="mt-4 mb-4" style={{height: 500}}>
                    <ProjectMap/>
                </div>
                <ProjectList />
            </div>
        )
    }
}

export default Page