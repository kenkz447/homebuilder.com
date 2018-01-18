import * as React from 'react'
import { Layout, Row, Col } from 'antd'
import { NavLink } from 'react-router-dom'
import { ConnectedLogo, SearchBox } from '../../../components'

export function MasterHeader() {
    return (
        <Layout.Header className="brand-header">
            <Row className="brand-container">
                <Col span={12} className="mb-3 mb-xl-0" >
                    <ConnectedLogo />
                </Col>
                <Col span={24} xl={{span:12}}>
                    <div className="clearfix">
                        <div className="float-xl-right">
                            <SearchBox />
                            <div className="header-menu">
                                <div className="clearfix">
                                    <div className="float-xl-right">
                                        <ul className="header-menu-nav clearfix">
                                            <li className="header-menu-item"><NavLink className="header-menu-link" activeClassName="active" to="/">Project</NavLink></li>
                                            <li className="header-menu-item"><NavLink className="header-menu-link" activeClassName="active" to="/contact">Contact</NavLink></li>
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