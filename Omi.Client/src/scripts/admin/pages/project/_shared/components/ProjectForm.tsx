import { extend } from 'jquery-slim'
import * as React from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import * as uuid from 'uuid'

import { Button, Tabs, Form, Input, Row, Col, Select, Card, Collapse, Popover, Spin } from 'antd'

import { AvatarSelect } from 'shared/modules/FileAndMedia'
import { ProjectViewModel, ProjectBlockViewModel } from '../../../../Types'
import { ProjectFormTowerBlock } from './ProjectFormTowerBlock'

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
    static towerFieldName = `${nameof<ProjectViewModel>((o) => o.projectBlocks)}`
    static towerKeysFieldName = `${nameof<ProjectViewModel>((o) => o.projectBlocks)}-keys`

    componentWillReceiveProps(nextProps: FormStateProps) {
        if (nextProps.formPostResultProjectId && (this.props.formPostResultProjectId != nextProps.formPostResultProjectId))
            this.props.redirectToEdit(nextProps.formPostResultProjectId)

        if (this.props.initValue != nextProps.initValue) {
            if (nextProps.initValue[FormComponent.towerKeysFieldName]) {
                this.props.form.setFieldsValue({ [FormComponent.towerKeysFieldName]: nextProps.initValue[FormComponent.towerKeysFieldName] })
                for (const towerKey of nextProps.initValue[FormComponent.towerKeysFieldName]) {
                    const towerFieldName = `${[FormComponent.towerFieldName]}-${towerKey}`
                    this.props.form.getFieldDecorator(towerFieldName, { initialValue: nextProps.initValue[towerFieldName] })
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
                        {this.renderTowers()}
                    </TabPane>
                </Tabs>
            </Form>
        )
    }

    renderHidden() {
        return (
            <div>
                {
                    this.props.form.getFieldDecorator('id', {
                        initialValue: this.props.initValue.id
                    })(<Input type="hidden" />)
                }
                {
                    this.props.form.getFieldDecorator('language', {
                        initialValue: this.props.initValue.language
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
                    {this.props.form.getFieldDecorator('invertor', {
                        rules: [{ required: true }],
                        initialValue: this.props.initValue.invertor
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

    renderTowers() {
        this.props.form.getFieldDecorator(FormComponent.towerKeysFieldName, { initialValue: [] })
        const towerBlockKeys: Array<any> = this.props.form.getFieldValue(FormComponent.towerKeysFieldName)

        const towerBlockFields = towerBlockKeys.map((key) => {
            const towerFieldName = `${FormComponent.towerFieldName}-${key}`

            const block = this.props.form.getFieldValue(towerFieldName)

            if (!block)
                this.props.form.getFieldDecorator(towerFieldName, { initialValue: {} })

            return (
                <ProjectFormTowerBlock
                    key={key}
                    towerFieldName={towerFieldName}
                    towerBlock={block}
                    form={this.props.form}
                    onRemove={this.towerRemove(key)}
                />
            )
        })

        // chia các tower vào 3 cột.
        let division = 0
        const columnItems = [[], [], []]
        for (var i = 0; i < towerBlockFields.length; i++) {
            const block = towerBlockFields[i]
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
                    <Button onClick={this.towerAdd}>Add</Button>
                </div>
            </fieldset>
        )
    }

    @autobind
    towerAdd() {
        const towerKeys: Array<any> = this.props.form.getFieldValue(FormComponent.towerKeysFieldName)
        const newTowerKeys = uuid()

        towerKeys.push(newTowerKeys)

        this.props.form.setFieldsValue({
            [FormComponent.towerKeysFieldName]: towerKeys
        })
    }

    towerRemove = (keyToRemove) => () => {
        const towerKeys: Array<any> = this.props.form.getFieldValue(FormComponent.towerKeysFieldName)
        const newTowerKeys = towerKeys.filter((key) => key !== keyToRemove)

        this.props.form.setFieldsValue({
            [FormComponent.towerKeysFieldName]: newTowerKeys
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const blocks: Array<ProjectBlockViewModel> = []

                // Process tower block array
                for (const key of values['projectBlocks-keys']) {
                    const towerKey = `projectBlocks-${key}`
                    const tower = values[towerKey]

                    const towerBlock: ProjectBlockViewModel = {
                        label: tower.label,
                        children: []
                    }

                    if (Number.isInteger(tower.id))
                        towerBlock.id = tower.id

                    // Process floor block array
                    for (const key of tower['children-keys']) {
                        const floor = tower[`children-${key}`]

                        const floorBlock: ProjectBlockViewModel = {
                            label: floor.label,
                            children: []
                        }

                        if (Number.isInteger(floor.id))
                            floorBlock.id = floor.id

                        // Process room block array
                        for (const key of floor['children-keys']) {
                            const room = floor[`children-${key}`]
                            const roomBlock: ProjectBlockViewModel = {
                                label: room.label,
                                packageId: room.packageId,
                                layoutImage: room.layoutImage,
                                layoutPoints: room.layoutPoints
                            }

                            if (Number.isInteger(room.id))
                                roomBlock.id = room.id

                            floorBlock.children.push(roomBlock)
                        }
                        towerBlock.children.push(floorBlock)
                    }
                    blocks.push(towerBlock)
                }

                const valueToPost = extend(true, values, { projectBlocks: blocks })

                for (const key of valueToPost['projectBlocks-keys']) {
                    const towerKey = `projectBlocks-${key}`
                    delete valueToPost[towerKey]
                }
                delete valueToPost['projectBlocks-keys']

                this.props.post(valueToPost)
            }
        })
    }
}

export const ProjectForm = Form.create()(FormComponent)