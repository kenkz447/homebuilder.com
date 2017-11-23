import * as React from 'react'
import { Layout, Menu, Breadcrumb, Icon, } from 'antd'
import { NavLink } from 'react-router-dom'

import { ProjectSiderMenu } from '../containers/SiderMenu'
import { HeaderMenu } from '../containers/HeaderMenu'
import { BaseMasterPage } from './BaseMasterPage'

const { Header, Content, Sider, Footer } = Layout

export const ProjectMasterPage = (props) => (
    <BaseMasterPage>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
                <ProjectSiderMenu />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {props.children}
            </Content>
        </Layout>
    </BaseMasterPage>
)