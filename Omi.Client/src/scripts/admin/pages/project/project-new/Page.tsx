import * as React from 'react'
import { CreatePageWrap } from 'shared/core'

import { PROJECT_NEW, LAYOUT_PROJECT_MASTER } from '../../../settings'
import { ProjectFormNew } from './containers/ProjectFormNew'

const WithPageWrap = CreatePageWrap({
    pageKey: PROJECT_NEW,
    layoutType: LAYOUT_PROJECT_MASTER
})

@(WithPageWrap as any)
class Page extends React.Component<any> {
    render() {
        return (
            <div>
              <ProjectFormNew />
          </div>
        )
    }
}

export default Page 