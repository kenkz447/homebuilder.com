import * as React from 'react'
import { Row, Col } from 'antd'

import { SortBySelect } from '../../../../components/index'
import { FilterByCity } from './filters/FilterByCity'
import { FilterByProjectType } from './filters/FilterByProjectType'
import { FilterByProjectStatus } from './filters/FilterByProjectStatus'

export const Filter = () => {
    return (
        <Row gutter={30}>
            <Col span={6}>
                <SortBySelect />    
            </Col>
            <Col span={6}>
                <FilterByCity />    
            </Col>
            <Col span={6}>
                <FilterByProjectType />    
            </Col>
            <Col span={6}>
                <FilterByProjectStatus/>
            </Col>
        </Row>
    )
}