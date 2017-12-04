import * as React from 'react'
import { Table, Icon } from 'antd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { PaginationProps } from 'antd/lib/pagination'

import { RequestSend, ExtractImmutableHOC } from 'shared/core'
import { PageEntityViewModel, pageItemRender } from 'shared/modules/website'

import { ModuleRootState, ProductViewModel } from '../../../../Types'


interface StateProps {
    dataSource: PageEntityViewModel<any>
}

interface DispatchProps {
    getDataSource: () => void
}

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    render: (text, entity: ProductViewModel) => {
        return <NavLink to={`/website/admin/product/update?${nameof<ProductViewModel>(o => o.entityId)}=${entity.entityId}`}>{text}</NavLink>
    }
}]

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    }
}

class ProductTableComponent extends React.Component<StateProps & DispatchProps> {

    componentWillMount() {
        this.props.getDataSource()
    }

    getPagiOptions(): PaginationProps {
        if (!this.props.dataSource)
            return null

        return {
            itemRender: pageItemRender('d-block hb-table', new URL(location.href), this.props.dataSource.pager.totalPage),
            total: this.props.dataSource.pager.totalPage * 9,
            defaultPageSize: 9,
            current: this.props.dataSource.pager.pageIndex,
            onChange: ((page, pageSize) => {
                this.props.getDataSource()
            }).bind(this)
        }
    }

    render() {
        const pagination = this.getPagiOptions()
        return (
            <Table
                rowKey="id"
                pagination={pagination}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={this.props.dataSource && this.props.dataSource.entities} />
        )
    }
}

const mapStateToProps = (state: ModuleRootState): StateProps => {
    return {
        dataSource: state.data.getIn(['PRODUCT', 'response', 'result'])
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getDataSource: () => {
            const params = new URLSearchParams(location.search)
            params.append('getMode', String(1))

            const requestSendAction = RequestSend('PRODUCT', {
                url: `/product/get?${params.toString()}`
            })
            dispatch(requestSendAction)
        }
    }
}

const ProductTableWithPureData = ExtractImmutableHOC(ProductTableComponent)
export const ProductTable = connect(mapStateToProps, mapDispatchToProps)(ProductTableWithPureData)