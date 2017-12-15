import * as React from 'react'

import { Card, Popover, Button, Collapse, Input, Form, Row, Col, Select } from 'antd'

import { autobind } from 'core-decorators'
import * as uuid from 'uuid'

import { ProjectBlockViewModel, ProjectViewModel } from '../../../../Types'
import { FormFileSelect } from 'shared/modules/FileAndMedia/index'
import { ProjectFromRoomPerspective } from './ProjectFromRoomPerspective'
import { ConnectedPackageSelect } from './ProjectFromPackageSelect'

interface OwnProps {
    fieldName?: any
    block?: ProjectBlockViewModel,
    form?: any
    onRemove?: () => void
}

export class ProjectFormRoomLayout extends React.Component<OwnProps> {
    roomKeysFieldName
    static defaultProps: OwnProps = {
        block: {}
    }

    static roomFieldName = nameof<ProjectBlockViewModel>((o) => o.children)
    constructor(props: OwnProps) {
        super(props)
        this.roomKeysFieldName = `${props.fieldName}.children-keys`

        // Initial form values
        props.form.getFieldDecorator(this.roomKeysFieldName, { initialValue: [] })
        props.form.getFieldDecorator(`${props.fieldName}.${nameof<ProjectBlockViewModel>((o) => o.id)}`, {
            initialValue: props.block.id
        })
    }

    componentWillMount() {
        if (this.props.block.children) {
            const roomKeys = this.props.block.children.map((o) => o.id)

            this.props.form.setFieldsValue({ [this.roomKeysFieldName]: roomKeys })

            for (const key of roomKeys) {
                const roomFieldName = `${this.props.fieldName}.${ProjectFormRoomLayout.roomFieldName}-${key}`
                const roomValue = this.props.block.children.find((o) => o.id == key)
                this.props.form.getFieldDecorator(roomFieldName, { initialValue: roomValue })
            }
        }
    }

    render() {
        return (
            <div>
                <div className="mb-3">
                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item>
                                {
                                    this.props.form.getFieldDecorator(`${this.props.fieldName}.${nameof<ProjectBlockViewModel>(o => o.label)}`, {
                                        initialValue: this.props.block.label
                                    })(<Input placeholder="Room layout name" />)
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                {
                                    this.props.form.getFieldDecorator(`${this.props.fieldName}.${nameof<ProjectBlockViewModel>(o => o.area)}`, {
                                        initialValue: this.props.block.area
                                    })(<Input placeholder="Area" type="number" />)
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                {
                                    this.props.form.getFieldDecorator(`${this.props.fieldName}.${nameof<ProjectBlockViewModel>(o => o.bedRoomCount)}`, {
                                        initialValue: this.props.block.bedRoomCount
                                    })(<Input placeholder="Total bedroom" type="number" />)
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                {
                                    this.props.form.getFieldDecorator(`${this.props.fieldName}.${nameof<ProjectBlockViewModel>(o => o.toiletCount)}`, {
                                        initialValue: this.props.block.toiletCount
                                    })(<Input placeholder="Total toilet" type="number" />)
                                }
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                {
                                    this.props.form.getFieldDecorator(`${this.props.fieldName}.${nameof<ProjectBlockViewModel>(o => o.totalRoomOfLayout)}`, {
                                        initialValue: this.props.block.totalRoomOfLayout
                                    })(<Input placeholder="Total apartment" type="number" />)
                                }
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        {
                            this.props.form.getFieldDecorator(`${this.props.fieldName}.layoutImage`, {
                                initialValue: this.props.block.layoutImage,
                            })(
                                <FormFileSelect label="Select layout image" buttonStyle={{ width: 150 }} />
                                )
                        }
                    </Form.Item>

                    <Collapse bordered={false} accordion>
                        {this.renderRooms()}
                    </Collapse>
                </div>
                <div className="text-right">
                    <Button className="border-0" type="primary" icon="plus" onClick={this.addRoom} ghost>Add new Prespective</Button>
                    <Button className="border-0" type="danger" icon="close" onClick={this.props.onRemove} ghost>Remove</Button>
                </div>
            </div>
        )
    }

    renderRoomItem({ key, fieldName }) {
        const fieldNameHie = fieldName.split('.')
        const roomTypeFieldName = fieldNameHie[0]
        const roomLayoutFieldName = fieldNameHie[1]
        const roomFieldName = fieldNameHie[2]

        const roomType = this.props.form.getFieldValue(roomTypeFieldName)
        let roomValue: ProjectBlockViewModel = roomType[roomLayoutFieldName][roomFieldName]
        if (!roomValue) {
            this.props.form.getFieldDecorator(fieldName, { initialValue: {} })
            roomValue = {}
        }

        return (
            <Collapse.Panel key={fieldName} header="Perspective">
                <Row gutter={15}>
                    <Col span={12}>
                        <Form.Item>
                            {this.props.form.getFieldDecorator(`${fieldName}.${nameof<ProjectBlockViewModel>((o) => o.packageId)}`, {
                                initialValue: roomValue.packageId,
                                rules: [{ required: true }]
                            })(<ConnectedPackageSelect />)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <div className="clearfix">
                            <Button className="float-right" type="danger" shape="circle" icon="delete" onClick={this.removeRoom(key)} />
                        </div>
                    </Col>
                </Row>
                <div>
                    {
                        this.props.form.getFieldDecorator(`${fieldName}.layoutPoints`, {
                            initialValue: roomValue.layoutPoints,
                        })(
                            <ProjectFromRoomPerspective file={this.props.block && this.props.block.layoutImage} />
                            )
                    }
                </div>
            </Collapse.Panel>
        )
    }

    renderRooms() {
        const roomLayoutKeys: Array<any> = this.props.form.getFieldValue(this.roomKeysFieldName)

        const roomLayoutFields = roomLayoutKeys.map((key) => {
            const newFieldName = `${this.props.fieldName}.${ProjectFormRoomLayout.roomFieldName}-${key}`
            return this.renderRoomItem({ key, fieldName: newFieldName })
        })

        return roomLayoutFields
    }

    @autobind
    addRoom() {
        const roomBlockKeys: Array<any> = this.props.form.getFieldValue(this.roomKeysFieldName)
        const newRoomKey = uuid()
        const newRoomBlockKeys = roomBlockKeys.concat(newRoomKey)

        this.props.form.setFieldsValue({
            [this.roomKeysFieldName]: newRoomBlockKeys
        })
    }

    removeRoom = (keyToRemove) => () => {
        const roomBlockKeys: Array<any> = this.props.form.getFieldValue(this.roomKeysFieldName)
        const newRoomBlockKeys = roomBlockKeys.filter((key) => key !== keyToRemove)

        this.props.form.setFieldsValue({
            [this.roomKeysFieldName]: newRoomBlockKeys
        })
    }
}