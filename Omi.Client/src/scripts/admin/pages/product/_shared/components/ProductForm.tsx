import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Tabs, Form, Input, Row, Col, Select } from 'antd'

import { AvatarSelect, PictureWall } from 'shared/modules/FileAndMedia'
import { ProductViewModel } from '../../../../Types'

export interface ProductFormDispatchProps {
    getInitialViewModel?: () => void
    post?: (FormValues: ProductViewModel) => void
    redirectToEdit?: (entityId: number) => void
    cleanSelectedResult?: () => void
}

export interface ProductFormStateProps {
    initProductViewModel?: ProductViewModel
    formPostResultProductId?: number
    searchParams?: string
}

export interface ProductFormProps extends ProductFormStateProps, ProductFormDispatchProps {
    form: any
}

const FormItem = Form.Item
const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input

const operations = [
    <Button key="submit" type="primary" htmlType="submit">Submit</Button>
]

class ProductFormComponent extends React.Component<ProductFormProps> {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps: ProductFormProps) {
        if (nextProps.formPostResultProductId && (this.props.formPostResultProductId != nextProps.formPostResultProductId)) {
            this.props.getInitialViewModel()
            this.props.form.resetFields()
            this.props.redirectToEdit(nextProps.formPostResultProductId)
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
                    <TabPane tab="Product info" key="1">
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
                </Tabs>
            </Form>
        )
    }

    renderHidden() {
        return (
            <div>
                {
                    this.props.form.getFieldDecorator(nameof<ProductViewModel>(o => o.id), {
                        initialValue: this.props.initProductViewModel.id
                    })(<Input key="id" type="hidden" />)
                }
            </div>)
    }

    renderBasicInfomation() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Basic infomation</h2>
                <FormItem>
                    {this.props.form.getFieldDecorator(nameof<ProductViewModel>(o => o.avatar), {
                        rules: [{ required: true, message: 'Please select avatar!' }],
                        initialValue: this.props.initProductViewModel.avatar
                    })(<AvatarSelect />)}
                </FormItem>
                <FormItem label="Title">
                    {this.props.form.getFieldDecorator(nameof<ProductViewModel>(o => o.title), {
                        rules: [{ required: true, message: 'Title is required!' }],
                        initialValue: this.props.initProductViewModel.title
                    })(<Input placeholder="Title" />)}
                </FormItem>
                <FormItem label="Price">
                    {this.props.form.getFieldDecorator(nameof<ProductViewModel>(o => o.price), {
                        rules: [{ required: true, message: 'Price is required!' }],
                        initialValue: this.props.initProductViewModel.price
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
                    {this.props.form.getFieldDecorator(nameof<ProductViewModel>(o => o.designThemeId), {
                        rules: [{ required: true, message: 'Please select design theme!' }],
                        initialValue: this.props.initProductViewModel.designThemeId
                    })(
                        <Select placeholder="Design theme">
                            {
                                this.props.initProductViewModel.avaliableDesignThemes && this.props.initProductViewModel.avaliableDesignThemes.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem label="House type">
                    {this.props.form.getFieldDecorator(nameof<ProductViewModel>(o => o.houseTypeId), {
                        rules: [{ required: true, message: 'Please select house type!' }],
                        initialValue: this.props.initProductViewModel.houseTypeId
                    })(
                        <Select placeholder="House type">
                            {
                                this.props.initProductViewModel.avaliableHouseStyles && this.props.initProductViewModel.avaliableHouseStyles.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem label="Area">
                    {this.props.form.getFieldDecorator(nameof<ProductViewModel>(o => o.area), {
                        rules: [{ required: true, message: 'Area is required!' }],
                        initialValue: this.props.initProductViewModel.area
                    })(<Input type="number" placeholder="Area" addonAfter="m2" />)}
                </FormItem>
                <FormItem>
                    {this.props.form.getFieldDecorator(nameof<ProductViewModel>(o => o.sortText), {
                        initialValue: this.props.initProductViewModel.sortText
                    })(<TextArea placeholder="Sort text" />)}
                </FormItem>
                <FormItem label="Included">
                    {this.props.form.getFieldDecorator(nameof<ProductViewModel>(o => o.productIncludedItemIds), {
                        initialValue: this.props.initProductViewModel.productIncludedItemIds
                    })(
                        <Select placeholder="Include items" mode="multiple">
                            {
                                this.props.initProductViewModel.avaliableProductIncludedItems && this.props.initProductViewModel.avaliableProductIncludedItems.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem label="Furniture">
                    {this.props.form.getFieldDecorator(nameof<ProductViewModel>(o => o.productFurnitureIncludedItemIds), {
                        initialValue: this.props.initProductViewModel.productFurnitureIncludedItemIds
                    })(
                        <Select placeholder="Include items" mode="multiple">
                            {
                                this.props.initProductViewModel.avaliableProductFurnitureIncludedItems && this.props.initProductViewModel.avaliableProductFurnitureIncludedItems.map((e) => (
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
                        initialValue: this.props.initProductViewModel.pictures
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

export const ProductForm = Form.create()(ProductFormComponent)