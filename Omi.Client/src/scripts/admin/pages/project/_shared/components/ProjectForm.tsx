import { extend } from 'jquery-slim'
import * as React from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import * as uuid from 'uuid'

import { Button, Tabs, Form, Input, Row, Col, Select, Card, Collapse, Popover, Spin } from 'antd'

import { AvatarSelect } from 'shared/modules/FileAndMedia'
import { ProjectViewModel, ProjectBlockViewModel } from '../../../../Types'
import { ProjectFormRoomType } from './ProjectFormRoomType'

export interface FormDispatchProps {
    getInitialViewModel?: () => void
    post?: (FormValues: ProjectViewModel) => void
    redirectToEdit?: (entityId: number) => void
}

export interface FormStateProps {
    initValue?: ProjectViewModel
    formPostResultProjectId?: number
    searchParams?: string
}

export interface FormOwnProps {
    form: any
}

const FormItem = Form.Item
const { TabPane } = Tabs
const { Option } = Select
const { TextArea, Group } = Input

const operations = [
    <Button type="primary" htmlType="submit">Submit</Button>
]

export class FormComponent extends React.Component<FormOwnProps & FormStateProps & FormDispatchProps> {
    static roomTypeFieldName = `${nameof<ProjectViewModel>((o) => o.projectBlocks)}`
    static roomTypeKeysFieldName = `${nameof<ProjectViewModel>((o) => o.projectBlocks)}-keys`

    componentWillReceiveProps(nextProps: FormStateProps) {
        if (nextProps.formPostResultProjectId && (this.props.formPostResultProjectId != nextProps.formPostResultProjectId))
            this.props.redirectToEdit(nextProps.formPostResultProjectId)

        if (this.props.initValue != nextProps.initValue) {
            if (nextProps.initValue[FormComponent.roomTypeKeysFieldName]) {
                this.props.form.setFieldsValue({ [FormComponent.roomTypeKeysFieldName]: nextProps.initValue[FormComponent.roomTypeKeysFieldName] })
                for (const roomTypeKey of nextProps.initValue[FormComponent.roomTypeKeysFieldName]) {
                    const roomTypeFieldName = `${[FormComponent.roomTypeFieldName]}-${roomTypeKey}`
                    this.props.form.getFieldDecorator(roomTypeFieldName, { initialValue: nextProps.initValue[roomTypeFieldName] })
                }
            }
        }
    }

    componentWillMount() {
        this.props.getInitialViewModel()
    }

    render() {
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                {this.renderHidden()}
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                    <TabPane tab="Project info" key="1">
                        <Row gutter={30}>
                            <Col span={8}>
                                {this.renderBasicInfomation()}
                            </Col>
                            <Col span={8}>
                                {this.renderDesciption()}
                            </Col>
                            <Col span={8}>
                                {this.renderLocation()}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Layouts" key="2">
                        {this.renderRoomTypes()}
                    </TabPane>
                </Tabs>
            </Form>
        )
    }

    renderHidden() {
        return (
            <div>
                {
                    this.props.form.getFieldDecorator(nameof<ProjectViewModel>((o) => o.projectId), {
                        initialValue: this.props.initValue.projectId
                    })(<Input type="hidden" />)
                }
            </div>
        )
    }

    renderBasicInfomation() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Basic infomation</h2>
                <FormItem label="Thumbnail">
                    {this.props.form.getFieldDecorator('avatar', {
                        rules: [{ required: true }],
                        initialValue: this.props.initValue.avatar
                    })(<AvatarSelect />)}
                </FormItem>
                <FormItem label="Title">
                    {this.props.form.getFieldDecorator('title', {
                        rules: [{ required: true }],
                        initialValue: this.props.initValue.title
                    })(<Input placeholder="Title" />)}
                </FormItem>
                <FormItem label="Project type">
                    {this.props.form.getFieldDecorator('projectTypeId', {
                        rules: [{ required: true }],
                        initialValue: this.props.initValue.projectTypeId || undefined
                    })(
                        <Select placeholder="Select one">
                            {
                                this.props.initValue.avaliableProjectTypes && this.props.initValue.avaliableProjectTypes.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                        )}
                </FormItem>
            </fieldset>
        )
    }

    renderDesciption() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Description</h2>
                <FormItem label="Invertor">
                    {this.props.form.getFieldDecorator('investor', {
                        rules: [{ required: true }],
                        initialValue: this.props.initValue.investor
                    })(<Input />)}
                </FormItem>
                <FormItem label="Started year">
                    {this.props.form.getFieldDecorator('startedYear', {
                        rules: [{ required: true }],
                        initialValue: this.props.initValue.startedYear || undefined
                    })(<Input type="number" />)}
                </FormItem>
                <FormItem label="Total apartment">
                    {this.props.form.getFieldDecorator('totalApartment', {
                        rules: [{ required: true }],
                        initialValue: this.props.initValue.totalApartment || undefined
                    })(<Input type="number" />)}
                </FormItem>
                <FormItem label="Area">
                    {this.props.form.getFieldDecorator('area', {
                        rules: [{ required: true }],
                        initialValue: this.props.initValue.area || undefined
                    })(<Input type="number" addonAfter="m2" />)}
                </FormItem>
                <FormItem label="Website">
                    {this.props.form.getFieldDecorator('website', {
                        initialValue: this.props.initValue.website
                    })(<Input placeholder="https://..." />)}
                </FormItem>
            </fieldset>
        )
    }

    renderLocation() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Location</h2>
                <FormItem label="City">
                    {this.props.form.getFieldDecorator('cityId', {
                        rules: [{ required: true }],
                        initialValue: this.props.initValue.cityId || undefined
                    })(
                        <Select placeholder="Select one">
                            {
                                this.props.initValue.avaliableGeographicaLocations && this.props.initValue.avaliableGeographicaLocations.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem label="Address">
                    {this.props.form.getFieldDecorator('street', {
                        initialValue: this.props.initValue.street
                    })(<Input />)}
                </FormItem>
                <FormItem label="Map Latitude/Longitude">
                    <Group compact>
                        {this.props.form.getFieldDecorator('mapLatitude', {
                            initialValue: this.props.initValue.mapLatitude
                        })(<Input style={{ width: '50%' }} placeholder="Latitude" />)}
                        {this.props.form.getFieldDecorator('mapLongitude', {
                            initialValue: this.props.initValue.mapLongitude
                        })(<Input style={{ width: '50%' }} placeholder="Longitude" />)}
                    </Group>
                </FormItem>
            </fieldset>
        )
    }

    renderRoomTypes() {
        this.props.form.getFieldDecorator(FormComponent.roomTypeKeysFieldName, { initialValue: [] })
        const roomTypeKeys: Array<any> = this.props.form.getFieldValue(FormComponent.roomTypeKeysFieldName)

        const roomTypeFields = roomTypeKeys.map((key) => {
            const roomTypeFieldName = `${FormComponent.roomTypeFieldName}-${key}`

            const block = this.props.form.getFieldValue(roomTypeFieldName)

            if (!block)
                this.props.form.getFieldDecorator(roomTypeFieldName, { initialValue: {} })

            return (
                <ProjectFormRoomType
                    key={key}
                    roomTypeFieldName={roomTypeFieldName}
                    roomType={block}
                    form={this.props.form}
                    onRemove={this.roomTypeRemove(key)}
                />
            )
        })

        // chia các roomType vào 3 cột.
        let division = 0
        const columnItems = [[], [], []]
        for (var i = 0; i < roomTypeFields.length; i++) {
            const block = roomTypeFields[i]
            columnItems[division].push(block)
            division++
            if (division > 2)
                division = 0
        }

        return (
            <fieldset>
                <div className="mb-3">
                    <Row gutter={20}>
                        {columnItems.map((o, i) => <Col key={i} span={8}>{columnItems[i]}</Col>)}
                    </Row>
                </div>

                <div>
                    <Button onClick={this.roomTypeAdd}>Add</Button>
                </div>
            </fieldset>
        )
    }

    @autobind
    roomTypeAdd() {
        const roomTypeKeys: Array<any> = this.props.form.getFieldValue(FormComponent.roomTypeKeysFieldName)
        const newRoomTypeKeys = uuid()

        roomTypeKeys.push(newRoomTypeKeys)

        this.props.form.setFieldsValue({
            [FormComponent.roomTypeKeysFieldName]: roomTypeKeys
        })
    }

    roomTypeRemove = (keyToRemove) => () => {
        const roomTypeKeys: Array<any> = this.props.form.getFieldValue(FormComponent.roomTypeKeysFieldName)
        const newRoomTypeKeys = roomTypeKeys.filter((key) => key !== keyToRemove)

        this.props.form.setFieldsValue({
            [FormComponent.roomTypeKeysFieldName]: newRoomTypeKeys
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const blocks: Array<ProjectBlockViewModel> = []

                // Process roomType block array
                for (const key of values['projectBlocks-keys']) {
                    const roomTypeKey = `projectBlocks-${key}`
                    const roomType = values[roomTypeKey]

                    const roomTypeBlock: ProjectBlockViewModel = {
                        label: roomType.label,
                        children: []
                    }

                    if (Number.isInteger(roomType.id))
                        roomTypeBlock.id = roomType.id

                    // Process roomLayout block array
                    for (const key of roomType['children-keys']) {
                        const roomLayout = roomType[`children-${key}`]

                        const roomLayoutBlock: ProjectBlockViewModel = {
                            label: roomLayout.label,
                            layoutImage: roomLayout.layoutImage,
                            children: []
                        }

                        if (Number.isInteger(roomLayout.id))
                            roomLayoutBlock.id = roomLayout.id

                        // Process room block array
                        for (const key of roomLayout['children-keys']) {
                            const room = roomLayout[`children-${key}`]
                            const roomBlock: ProjectBlockViewModel = {
                                label: room.label,
                                packageId: room.packageId,
                                layoutPoints: room.layoutPoints
                            }

                            if (Number.isInteger(room.id))
                                roomBlock.id = room.id

                            roomLayoutBlock.children.push(roomBlock)
                        }
                        roomTypeBlock.children.push(roomLayoutBlock)
                    }
                    blocks.push(roomTypeBlock)
                }

                const valueToPost = extend(true, values, { projectBlocks: blocks })

                for (const key of valueToPost['projectBlocks-keys']) {
                    const roomTypeKey = `projectBlocks-${key}`
                    delete valueToPost[roomTypeKey]
                }
                delete valueToPost['projectBlocks-keys']

                this.props.post(valueToPost)
            }
        })
    }
}

export const ProjectForm = Form.create()(FormComponent)