import * as React from 'react'
import { Row, Col } from 'antd'

import { CreatePageWrap } from 'shared/core'
import { MAIN_MASTER } from '../../layout'

import {
    SortBySelect,
    FilterByHouseType,
    FilterByBudgetRange,
    FilterByDesingTheme
} from '../../components'

import { indexRouteName } from './keys'
import { PackageList } from './containers'
@(CreatePageWrap({ pageKey: indexRouteName, layoutType: MAIN_MASTER }))
class Index extends React.Component {
    render() {
        return (
            <div className="page brand-container">
                <Row className="mb-5" gutter={30}>
                    <Col span={6}><SortBySelect /></Col>
                    <Col span={6}><FilterByDesingTheme /></Col>
                    <Col span={6}><FilterByBudgetRange /></Col>
                    <Col span={6}><FilterByHouseType /></Col>
                </Row>

                <PackageList />
            </div>
        )
    }
}

export default Index