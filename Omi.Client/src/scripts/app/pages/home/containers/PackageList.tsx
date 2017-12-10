import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import { ExtractImmutableHOC, RequestSend } from '../../../../shared/core'
import { PageEntityViewModel,Pager, Transition } from '../../../../shared/modules/website'
import { PackageViewModel } from '../../../../admin'

import { WebsiteRootState } from '../../../Types'

import { PackageItem } from './package-list/PackageItem'

interface DispatchProps {
    getpackages: () => void
}
interface StateProps {
    packagePage: PageEntityViewModel<PackageViewModel>
    search: string
}

const PackageListPager = Pager('pager')

class PackageListComponent extends React.Component<StateProps & DispatchProps> {
    componentWillReceiveProps(nextProps: StateProps) {
        if (this.props.search != nextProps.search)
            this.props.getpackages()
    }

    componentWillMount() {
        this.props.getpackages()
    }

    render() {
        if (!this.props.packagePage)
            return null

        return (
            <Transition>
                <Row className="package-list" gutter={30} >
                    {
                        this.props.packagePage && this.props.packagePage.entities.map((item) => (
                            <Col key={item.id} span={8}>
                                <PackageItem package={item} />
                            </Col>)
                        )
                    }
                    {
                        this.props.packagePage.entities.length &&
                        <Col span={24}>
                            <div className="clearfix">
                                <div className="float-right">
                                    <PackageListPager baseURL={new URL(location.href)}  {...this.props.packagePage.pager} />
                                </div>
                            </div>
                        </Col>
                    }

                </Row>
            </Transition>
        )
    }
}

const mapStateToProps = (state: WebsiteRootState): StateProps => {
    return {
        packagePage: state.data.getIn(['WEBSITE_PACKAGES', 'response']),
        search: state.router.location.search
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getpackages: () => {
            const params = new URLSearchParams(location.search)
            params.append('getTypes', 'non-perspective')
            const requestSendAction = RequestSend('WEBSITE_PACKAGES', {
                url: `/package/getPackages?${params.toString()}`
            })
            dispatch(requestSendAction)
        }
    }
}

const PackageListWithPureData = ExtractImmutableHOC(PackageListComponent)
export const PackageList = connect(mapStateToProps, mapDispatchToProps)(PackageListWithPureData)