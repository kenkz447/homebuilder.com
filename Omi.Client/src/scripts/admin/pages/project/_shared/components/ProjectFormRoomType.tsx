import * as React from 'react'
import { Card, Popover, Button, Collapse, Input, Form, Row, Col, Select } from 'antd'
import { autobind } from 'core-decorators'
import * as uuid from 'uuid'

import { ProjectBlockViewModel, ProjectViewModel } from '../../../../Types'
import { ProjectFormRoomLayout } from './ProjectFormRoomLayout'

interface OwnProps {
    roomTypeFieldName?: any
    roomType?: ProjectBlockViewModel,
    form?: any
    onRemove?: () => void
}

export class ProjectFormRoomType extends React.Component<OwnProps> {
    roomLayoutKeysFieldName
    static defaultProps: OwnProps = {
        roomType: {}
    }
    static roomLayoutFieldName = nameof<ProjectBlockViewModel>((o) => o.children)
    constructor(props: OwnProps) {
        super(props)

        this.roomLayoutKeysFieldName = `${props.roomTypeFieldName}.${ProjectFormRoomType.roomLayoutFieldName}-keys`
    }

    componentWillMount() {
        // Initial form values
        this.props.form.getFieldDecorator(this.roomLayoutKeysFieldName, { initialValue: [] })
        this.props.form.getFieldDecorator(`${this.props.roomTypeFieldName}.${nameof<ProjectBlockViewModel>((o) => o.id)}`, {
            initialValue: this.props.roomType.id
        })

        if (this.props.roomType.children) {
            const roomLayoutKeys = this.props.roomType.children.map((o) => o.id)

            this.props.form.setFieldsValue({ [this.roomLayoutKeysFieldName]: roomLayoutKeys })

            for (const key of roomLayoutKeys) {
                const roomLayoutFieldName = `${this.props.roomTypeFieldName}.${ProjectFormRoomType.roomLayoutFieldName}-${key}`
                const roomLayoutValue = this.props.roomType.children.find((o) => o.id == key)
                this.props.form.getFieldDecorator(roomLayoutFieldName, { initialValue: roomLayoutValue })
            }
        }
    }

    render() {
        return (
            <Card key={this.props.roomTypeFieldName} className="mb-3" title={this.props.roomType.label || `New Room Type`} extra={this.renderRoomTypeActions()} noHovering>
                <Form.Item>
                    {
                        this.props.form.getFieldDecorator(`${this.props.roomTypeFieldName}.${nameof<ProjectBlockViewModel>((o) => o.label)}`, {
                            initialValue: this.props.roomType.label,
                            rules: [{ required: true }]
                        })(<Input placeholder="Room type name" />)
                    }
                </Form.Item>
                {
                    this.renderRoomLayouts()
                }
            </Card>
        )
    }

    renderRoomTypeActions() {
        return (
            <Popover placement="bottomRight" content={
                <div>
                    <Button className="border-0" type="primary" icon="plus" onClick={this.addRoomLayout} ghost>Add new RoomLayout</Button>
                    <Button className="border-0" type="danger" icon="delete" onClick={this.props.onRemove} ghost>Remove</Button>
                </div>
            } trigger="click">
                <Button shape="circle" icon="ellipsis" />
            </Popover>
        )
    }

    renderRoomLayouts() {
        const roomLayoutKeys: Array<any> = this.props.form.getFieldValue(this.roomLayoutKeysFieldName)

        if (!roomLayoutKeys || !roomLayoutKeys.length)
            return []

        const roomLayoutFields = roomLayoutKeys.map((key) => {
            const roomLayoutFieldName = `${this.props.roomTypeFieldName}.${ProjectFormRoomType.roomLayoutFieldName}-${key}`

            let block = this.props.form.getFieldValue(roomLayoutFieldName)
            if (!block) {
                this.props.form.getFieldDecorator(roomLayoutFieldName, { initialValue: {} })
                block = {}
            }

            return (
                <Collapse.Panel key={roomLayoutFieldName} header={block.label || 'New Room Layout'}>
                    <ProjectFormRoomLayout
                        key={key}
                        block={block}
                        fieldName={roomLayoutFieldName}
                        form={this.props.form}
                        onRemove={this.removeRoomLayout(key)}
                    />
                </Collapse.Panel>
            )
        })

        return <Collapse accordion>{roomLayoutFields}</Collapse>
    }

    @autobind
    addRoomLayout() {
        const roomLayoutKeys: Array<any> = this.props.form.getFieldValue(this.roomLayoutKeysFieldName)
        const newRoomLayoutKey = uuid()
        const newRoomLayoutKeys = roomLayoutKeys.concat(newRoomLayoutKey)

        this.props.form.setFieldsValue({
            [this.roomLayoutKeysFieldName]: newRoomLayoutKeys
        })
    }

    removeRoomLayout = (keyToRemove) => () => {
        const roomLayoutKeys = this.props.form.getFieldValue(this.roomLayoutKeysFieldName)
        const newRoomLayoutKeys = roomLayoutKeys.filter((key) => key !== keyToRemove)

        this.props.form.setFieldsValue({
            [this.roomLayoutKeysFieldName]: newRoomLayoutKeys
        })
    }
}