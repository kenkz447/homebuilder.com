import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Tabs, Form, Input, Row, Col, Select } from 'antd'

import { AvatarSelect, PictureWall } from 'shared/modules/FileAndMedia'
import { PackageViewModel } from '../../../../Types'

export interface PackageFormDispatchProps {
    getInitialViewModel?: () => void
    post?: (FormValues: PackageViewModel) => void
    redirectToEdit?: (entityId: number) => void
    cleanSelectedResult?: () => void
}

export interface PackageFormStateProps {
    initPackageViewModel?: PackageViewModel
    formPostResultPackageId?: number
    searchParams?: string
}

export interface PackageFormProps extends PackageFormStateProps, PackageFormDispatchProps {
    form: any
}

const FormItem = Form.Item
const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input

const operations = [
    <Button type="primary" htmlType="submit">Submit</Button>
]

class PackageFormComponent extends React.Component<PackageFormProps> {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps: PackageFormProps) {
        if (nextProps.formPostResultPackageId && (this.props.formPostResultPackageId != nextProps.formPostResultPackageId)) {
            this.props.form.resetFields()
            this.props.redirectToEdit(nextProps.formPostResultPackageId)
        }
    }

    componentWillMount() {
        this.props.getInitialViewModel()
    }

    render() {
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                {
                    this.renderHidden.bind(this)()
                }
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                    <TabPane tab="Package info" key="1">
                        <Row gutter={30}>
                            <Col span={8}>
                                {this.renderBasicInfomation.bind(this)()}
                            </Col>
                            <Col span={8}>
                                {this.renderDesciption.bind(this)()}
                            </Col>
                            <Col span={8}>
                                {this.renderPictures.bind(this)()}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="SEO" key="2">Content of Tab Pane 2</TabPane>
                </Tabs>
            </Form>
        )
    }

    renderHidden() {
        return (
            <div>
                {
                    this.props.form.getFieldDecorator('id', {
                        initialValue: this.props.initPackageViewModel.id
                    })(<Input key="id" type="hidden" />)
                }
            </div>)
    }

    renderBasicInfomation() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Basic infomation</h2>
                <FormItem>
                    {this.props.form.getFieldDecorator('avatar', {
                        rules: [{ required: true, message: 'Please select avatar!' }],
                        initialValue: this.props.initPackageViewModel.avatar
                    })(<AvatarSelect />)}
                </FormItem>
                <FormItem label="Title">
                    {this.props.form.getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Title is required!' }],
                        initialValue: this.props.initPackageViewModel.title
                    })(<Input placeholder="Title" />)}
                </FormItem>
                <FormItem label="Price">
                    {this.props.form.getFieldDecorator('price', {
                        rules: [{ required: true, message: 'Price is required!' }],
                        initialValue: this.props.initPackageViewModel.price
                    })(<Input type="number" placeholder="Price" addonAfter="vnđ" />)}
                </FormItem>
            </fieldset>
        )
    }

    renderDesciption() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Description</h2>
                <FormItem label="Design theme">
                    {this.props.form.getFieldDecorator('designThemeId', {
                        rules: [{ required: true, message: 'Please select design theme!' }],
                        initialValue: this.props.initPackageViewModel.designThemeId
                    })(
                        <Select placeholder="Design theme">
                            {
                                this.props.initPackageViewModel.avaliableDesignThemes && this.props.initPackageViewModel.avaliableDesignThemes.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem label="House type">
                    {this.props.form.getFieldDecorator('houseTypeId', {
                        rules: [{ required: true, message: 'Please select house type!' }],
                        initialValue: this.props.initPackageViewModel.houseTypeId
                    })(
                        <Select placeholder="House type">
                            {
                                this.props.initPackageViewModel.avaliableHouseStyles && this.props.initPackageViewModel.avaliableHouseStyles.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem label="Area">
                    {this.props.form.getFieldDecorator('area', {
                        rules: [{ required: true, message: 'Area is required!' }],
                        initialValue: this.props.initPackageViewModel.area
                    })(<Input type="number" placeholder="Area" addonAfter="m2" />)}
                </FormItem>
                <FormItem>
                    {this.props.form.getFieldDecorator('sortText', {
                        initialValue: this.props.initPackageViewModel.sortText
                    })(<TextArea placeholder="Sort text" />)}
                </FormItem>
                <FormItem label="Included">
                    {this.props.form.getFieldDecorator('packageIncludedItemIds', {
                        initialValue: this.props.initPackageViewModel.packageIncludedItemIds
                    })(
                        <Select placeholder="Include items" mode="multiple">
                            {
                                this.props.initPackageViewModel.avaliablePackageIncludedItems && this.props.initPackageViewModel.avaliablePackageIncludedItems.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                        )}
                </FormItem>
            </fieldset>
        )
    }

    renderPictures() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Pictures</h2>
                <FormItem label="Gallery">
                    {this.props.form.getFieldDecorator('pictures', {
                        initialValue: this.props.initPackageViewModel.pictures
                    })(<PictureWall />)}
                </FormItem>
            </fieldset>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err)
                this.props.post(values)
        })
    }
}

export const PackageForm = Form.create()(PackageFormComponent)