import * as React from 'react'
import { Layout, Row, Col } from 'antd'

export function MasterFooter() {
    return (
        <Layout.Footer className="brand-footer">
            <div className="brand-container">
                <Row>
                    <Col span={6}>
                        <span className="brand-footer-text">&#169; HHOME. ALL RIGHTS RESERVED</span>
                    </Col>
                    <Col span={6}>
                    </Col>
                </Row>
            </div>
        </Layout.Footer>
    )
}