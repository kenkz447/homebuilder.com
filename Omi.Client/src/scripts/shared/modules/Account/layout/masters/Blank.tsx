import * as React from 'react'
import { Layout } from 'antd'

export const Blank = (props) => (
    <Layout className="layout">
        <Layout.Content>
            {props.children}
        </Layout.Content>
    </Layout>
)