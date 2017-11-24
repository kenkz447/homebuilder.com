import * as React from 'react'
import { Layout, Row, Col } from 'antd'
import { NavLink } from 'react-router-dom'
import { Logo, SearchBox } from '../../../components'

export function MasterHeader() {
    return (
        <Layout.Header className="brand-header">
            <Row className="brand-container">
                <Col span={12}>
                    <Logo />
                </Col>
                <Col span={12}>
                    <div className="clearfix">
                        <div className="float-right">
                            <SearchBox />
                            <div className="header-menu">
                                <div className="clearfix">
                                    <div className="float-right">
                                        <ul className="header-menu-nav clearfix">
                                            <li className="header-menu-item"><NavLink className="header-menu-link" exact={true} activeClassName="active" to="/">Package</NavLink></li>
                                            <li className="header-menu-item"><NavLink className="header-menu-link" activeClassName="active" to="/project">Project</NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Layout.Header>
    )
}