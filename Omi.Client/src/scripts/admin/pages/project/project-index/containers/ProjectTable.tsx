import * as React from 'react'
import { Table, Icon } from 'antd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { PaginationProps } from 'antd/lib/pagination'

import { RequestSend, ExtractImmutableHOC } from 'shared/core'
import { PageEntityViewModel, pageItemRender } from 'shared/modules/website'

import { ModuleRootState, ProjectViewModel } from '../../../../Types'


interface StateProps {
    dataSource: PageEntityViewModel<any>
}

interface DispatchProps {
    getDataSource: () => void
}

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    render: (text, entity: ProjectViewModel) => {
        return <NavLink to={`/website/admin/project/update?projectId=${entity.projectId}`}>{text}</NavLink>
    }
}]

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    }
}

class ProjectTableComponent extends React.Component<StateProps & DispatchProps> {

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
        dataSource: state.data.getIn(['PROJECT', 'response', 'result'])
    }
} 

const mapDispatchToProps = (dispatch): DispatchProps => {
    return {
        getDataSource: () => {
            const requestSendAction = RequestSend('PROJECT', {
                url: `/project/getProjects${location.search}`
            })
            dispatch(requestSendAction)
        }
    }
}

const ProjectTableWithPureData = ExtractImmutableHOC(ProjectTableComponent)
export const ProjectTable = connect(mapStateToProps, mapDispatchToProps)(ProjectTableWithPureData)