import * as React from 'react'
import { Card, Popover, Button, Collapse, Input, Form, Row, Col, Select } from 'antd'
import { autobind } from 'core-decorators'
import * as uuid from 'uuid'

import { ProjectBlockViewModel, ProjectViewModel } from '../../../../Types'
import { ProjectFormFloorBlock } from './ProjectFormFloorBlock'

interface OwnProps {
    towerFieldName?: any
    towerBlock?: ProjectBlockViewModel,
    form?: any
    onRemove?: () => void
}

export class ProjectFormTowerBlock extends React.Component<OwnProps> {
    floorKeysFieldName
    static defaultProps: OwnProps = {
        towerBlock: {}
    }
    static floorFieldName = nameof<ProjectBlockViewModel>((o) => o.children)
    constructor(props: OwnProps) {
        super(props)

        this.floorKeysFieldName = `${props.towerFieldName}.${ProjectFormTowerBlock.floorFieldName}-keys`
    }

    componentWillMount() {
        // Initial form values
        this.props.form.getFieldDecorator(this.floorKeysFieldName, { initialValue: [] })
        this.props.form.getFieldDecorator(`${this.props.towerFieldName}.${nameof<ProjectBlockViewModel>((o) => o.id)}`, {
            initialValue: this.props.towerBlock.id
        })

        if (this.props.towerBlock.children) {
            const floorKeys = this.props.towerBlock.children.map((o) => o.id)

            this.props.form.setFieldsValue({ [this.floorKeysFieldName]: floorKeys })

            for (const key of floorKeys) {
                const floorFieldName = `${this.props.towerFieldName}.${ProjectFormTowerBlock.floorFieldName}-${key}`
                const floorValue = this.props.towerBlock.children.find((o) => o.id == key)
                this.props.form.getFieldDecorator(floorFieldName, { initialValue: floorValue })
            }
        }
    }

    render() {
        return (
            <Card key={this.props.towerFieldName} className="mb-3" title={`Tower`} extra={this.renderTowerActions()} noHovering>
                <Form.Item>
                    {
                        this.props.form.getFieldDecorator(`${this.props.towerFieldName}.${nameof<ProjectBlockViewModel>((o) => o.label)}`, {
                            initialValue: this.props.towerBlock.label,
                            rules: [{ required: true }]
                        })(<Input placeholder="Tower name" />)
                    }
                </Form.Item>
                {
                    this.renderFloors()
                }
            </Card>
        )
    }

    renderTowerActions() {
        return (
            <Popover placement="bottomRight" content={
                <div>
                    <Button className="border-0" type="primary" icon="plus" onClick={this.addFloor} ghost>Add new Floor</Button>
                    <Button className="border-0" type="danger" icon="delete" onClick={this.props.onRemove} ghost>Remove</Button>
                </div>
            } trigger="click">
                <Button shape="circle" icon="ellipsis" />
            </Popover>
        )
    }

    renderFloors() {
        const floorKeys: Array<any> = this.props.form.getFieldValue(this.floorKeysFieldName)

        if (!floorKeys || !floorKeys.length)
            return []

        const floorFields = floorKeys.map((key) => {
            const floorFieldName = `${this.props.towerFieldName}.${ProjectFormTowerBlock.floorFieldName}-${key}`

            let block = this.props.form.getFieldValue(floorFieldName)
            if (!block) {
                this.props.form.getFieldDecorator(floorFieldName, { initialValue: {} })
                block = {}
            }

            return (
                <Collapse.Panel key={floorFieldName} header="Floor">
                    <ProjectFormFloorBlock
                        key={key}
                        block={block}
                        fieldName={floorFieldName}
                        form={this.props.form}
                        onRemove={this.removeFloor(key)}
                    />
                </Collapse.Panel>
            )
        })

        return <Collapse accordion>{floorFields}</Collapse>
    }

    @autobind
    addFloor() {
        const floorBlockKeys: Array<any> = this.props.form.getFieldValue(this.floorKeysFieldName)
        const newFloorKey = uuid()
        const newFloorBlockKeys = floorBlockKeys.concat(newFloorKey)

        this.props.form.setFieldsValue({
            [this.floorKeysFieldName]: newFloorBlockKeys
        })
    }

    removeFloor = (keyToRemove) => () => {
        const floorKeys = this.props.form.getFieldValue(this.floorKeysFieldName)
        const newFloorKeys = floorKeys.filter((key) => key !== keyToRemove)

        this.props.form.setFieldsValue({
            [this.floorKeysFieldName]: newFloorKeys
        })
    }
}