import * as React from 'react'

import { PageOption } from '../types/PageOptions'
import BasePage from './BasePage'

export const CreatePageWrap = (props: PageOption) => (PageElement: React.ComponentType) => class Page extends React.Component<any> {
    render() {
        return (
            <BasePage {...props}>
                <PageElement />
            </BasePage>
        )
    }
}