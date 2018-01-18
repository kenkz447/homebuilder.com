import * as React from 'react'
import { Row, Col } from 'antd'

import { SortBySelect } from '../../../../components/index'
import { FilterByCity } from './filters/FilterByCity'
import { FilterByProjectType } from './filters/FilterByProjectType'
import { FilterByProjectStatus } from './filters/FilterByProjectStatus'

export const Filter = () => {
    return (
        <Row gutter={15}>
            <Col span={12} xl={{span: 6}} className="mb-2">
                <SortBySelect />    
            </Col>
            <Col span={12} xl={{span: 6}} className="mb-2">
                <FilterByCity />    
            </Col>
            <Col span={12} xl={{span: 6}} className="mb-2">
                <FilterByProjectType />    
            </Col>
            <Col span={12} xl={{span: 6}} className="mb-2">
                <FilterByProjectStatus/>
            </Col>
        </Row>
    )
}