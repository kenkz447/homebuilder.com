import * as React from 'react'
import { Table, Icon, Button, Input, Row, Col, Select } from 'antd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { PaginationProps } from 'antd/lib/pagination'

import { RequestSend, ExtractImmutableHOC } from 'shared/core'
import { PageEntityViewModel, pageItemRender } from 'shared/modules/website'

import { ModuleRootState, ProductViewModel } from '../../../../Types'

import { UploadExcel } from './UploadExcel'
import { ConnectedExportExcel } from './ExportExcel'
import { autobind } from 'core-decorators'
import { push } from 'react-router-redux'

interface StateProps {
    dataSource: PageEntityViewModel<any>
    deleteResult?: boolean
    deleteProcessing?: boolean
    dataSourceProcessing?: boolean
}

interface DispatchProps {
    getDataSource: () => void
    selectedDelete: (ids: Array<number>) => void
    onFilter: (filterObject) => void
}

const columns = [{
    title: 'Code',
    dataIndex: 'code',
    sorter: true,
    render: (text, entity: ProductViewModel) => {
        return <label>{text}</label>
    },
    width: 150
}, {
    title: 'Title',
    dataIndex: 'title',
    sorter: true,
    render: (text, entity: ProductViewModel) => {
        return <NavLink to={`/website/admin/product/update?${nameof<ProductViewModel>(o => o.entityId)}=${entity.entityId}`}>{text}</NavLink>
    }
}]

class ProductTableComponent extends React.Component<StateProps & DispatchProps> {
    selectedIds = []
    filters = {}
    componentWillReceiveProps(nextProps: StateProps) {
        if (nextProps.deleteResult == true)
            window.location.reload()
    }

    componentWillMount() {
        this.props.getDataSource()
    }

    getPagiOptions(): PaginationProps {
        if (!this.props.dataSource)
            return null
        const searchParams = new URLSearchParams(location.search)

        return {
            itemRender: pageItemRender('d-block hb-table', new URL(location.href), this.props.dataSource.pager.totalPage),
            total: this.props.dataSource.pager.totalPage * 9,
            defaultPageSize: 9,
            pageSize: +searchParams.get('pageSize'),
            current: this.props.dataSource.pager.pageIndex,
            onChange: ((page, pageSize) => {
                this.props.getDataSource()
            }).bind(this)
        }
    }

    render() {
        const pagination = this.getPagiOptions()
        return (
            <div>
                <div className="clearfix">
                    <div className="float-left">{this.renderImportExport()}</div>
                    <div className="float-right">
                        {this.renderTableAction()}
                    </div>
                </div>
                <div className="mb-3">
                    <div className="mb-2"><label>Filter</label></div>
                    {this.renderFilter()}
                </div>
                <Table
                    rowKey="id"
                    pagination={pagination}
                    rowSelection={{ onChange: this.onSelectChange }}
                    columns={columns}
                    onChange={this.handleTableChange}                    
                    dataSource={this.props.dataSource && this.props.dataSource.entities} />
            </div>
        )
    }
    @autobind
    handleTableChange(pagination, filters, sorter) {
        this.filters['sortField'] = sorter.field
        this.filters['sortOrder'] = sorter.order

        this.props.onFilter(this.filters)
    }

    @autobind
    onSelectChange(selectedRowKeys, selectedRows: Array<ProductViewModel>) {
        if (!selectedRows)
            return

        this.selectedIds = selectedRows.map(o => o.entityId)
    }

    @autobind
    deleteHandler() {
        if (this.selectedIds.length == 0)
            return

        const ok = confirm('Press OK button!')
        if (ok)
            this.props.selectedDelete(this.selectedIds)
    }

    inputFilterHandler = (filterKey) => (e) => {
        this.filters[filterKey] = e.target.value
    }

    selectFilterHandler = (filterKey) => (value) => {
        this.filters[filterKey] = value
    }
    @autobind
    filterHander() {
        this.filters['page'] = 1
        this.props.onFilter(this.filters)
    }

    renderFilter() {
        const searchParams = new URLSearchParams(location.search)

        return (
            <div>
                <Row gutter={15}>
                    <Col span={4}>
                        <Select className="w-100" placeholder="Display" defaultValue={searchParams.get('pageSize') || String(9)} onChange={this.selectFilterHandler('pageSize').bind(this)}>
                            <Select.Option value="9">Show 9 rows</Select.Option>
                            <Select.Option value="18">Show 18 rows</Select.Option>
                            <Select.Option value="36">Show 36 rows</Select.Option>
                            <Select.Option value="64">Show 64 rows</Select.Option>
                            <Select.Option value="100">Show 100 rows</Select.Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Input placeholder="Code" defaultValue={searchParams.get('code')} onChange={this.inputFilterHandler('code').bind(this)} />
                    </Col>
                    <Col span={4}>
                        <Input placeholder="Title" defaultValue={searchParams.get('title')} onChange={this.inputFilterHandler('title').bind(this)} />
                    </Col>
                    <Col>
                        <Button loading={this.props.dataSourceProcessing == true} onClick={this.filterHander}>Ok</Button>
                    </Col>
                </Row>
            </div>
        )
    }

    renderTableAction() {
        return (
            <div>
                <Button loading={this.props.deleteProcessing == true} onClick={this.deleteHandler} type="danger">Delete</Button>
            </div>
        )
    }

    renderImportExport() {
        return (
            <div className="clearfix mb-3">
                <div className="float-left mr-3">
                    <UploadExcel />
                </div>
                <div className="float-left">
                    <ConnectedExportExcel />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: ModuleRootState): StateProps => {
    return {
        dataSource: state.data.getIn(['PRODUCT', 'response']),
        dataSourceProcessing: state.data.getIn(['PRODUCT', 'status', 'processing']),
        deleteResult: state.data.getIn(['PRODUCT_DELETE', 'response', 'result']),
        deleteProcessing: state.data.getIn(['PRODUCT_DELETE', 'status', 'processing'])
    }
}

const mapDispatchToProps = (dispatch): DispatchProps => {
    const getDataSource = () => {
        const params = new URLSearchParams(location.search)
        params.append('getMode', String(1))

        const requestSendAction = RequestSend('PRODUCT', {
            url: `/product/get?${params.toString()}`
        })
        dispatch(requestSendAction)
    }
    return {
        getDataSource,
        selectedDelete: (ids) => {
            const requestSendAction = RequestSend('PRODUCT_DELETE', {
                url: `/product/delete`,
                requestInit: {
                    method: 'DELETE',
                    headers: new Headers({
                        'Content-type': 'application/json'
                    }),
                    body: JSON.stringify({ ids }),
                    credentials: 'include'
                }
            })
            dispatch(requestSendAction)
        },
        onFilter: (filterObject) => {
            const searchParams = new URLSearchParams(location.search)
            for (const b in filterObject) {
                searchParams.set(b, filterObject[b])
            }
            const action = push(`${location.pathname}?${searchParams.toString()}`)
            dispatch(action)
            getDataSource()
        }
    }
}

const ProductTableWithPureData = ExtractImmutableHOC(ProductTableComponent)
export const ProductTable = connect(mapStateToProps, mapDispatchToProps)(ProductTableWithPureData)