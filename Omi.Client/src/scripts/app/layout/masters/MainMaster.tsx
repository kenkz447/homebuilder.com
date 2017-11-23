import * as React from 'react'
import { Layout } from 'antd'

import { MasterHeader } from './containers/MasterHeader'
import { MasterFooter } from './containers/MasterFooter'
import { ConnectedMasterWrapper } from './containers/MasterWrapper'

export class MainMaster extends React.Component {
    render() {
        return (
            <ConnectedMasterWrapper>
                <Layout className="brand brand-layout">
                    <MasterHeader />
                    <Layout.Content className="mb-5">
                        {this.props.children}
                    </Layout.Content>
                    <MasterFooter />
                </Layout>
            </ConnectedMasterWrapper>
        )
    }
}