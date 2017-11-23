import * as React from 'react'
import { Layout, Menu, Breadcrumb, Icon, } from 'antd'
import { NavLink } from 'react-router-dom'

import { FileSelectModal } from 'shared/modules/FileAndMedia/index'

import { PackageSiderMenu } from '../containers/SiderMenu'
import { HeaderMenu } from '../containers/HeaderMenu'

const { Header, Content, Sider, Footer } = Layout

export const BaseMasterPage = (props) => (
    <Layout className="layout">
        <Header className="header">
            <div className="logo d-inline-block">
                <NavLink to="/">HB</NavLink>
            </div>
            <HeaderMenu />
        </Header>
        <Content style={{ padding: '30px 30px 0 30px' }}>
            {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            Omi ©2017 Created by Kenkz447
        </Footer>
        <FileSelectModal />
    </Layout>
)