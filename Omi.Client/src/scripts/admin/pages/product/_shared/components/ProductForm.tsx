import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Tabs, Form, Input, Row, Col, Select } from 'antd'

import { AvatarSelect, PictureWall } from 'shared/modules/FileAndMedia'
import { ProductViewModel } from '../../../../Types'

export interface ProductFormDispatchProps {
    getInitialViewModel?: () => void
    post?: (FormValues: ProductViewModel) => void
    onPostSucceeded?: (entityId: number) => void
    cleanSelectedResult?: () => void
}

export interface ProductFormStateProps {
    initProductViewModel?: ProductViewModel
    FORM_POST_RESULT_PRODUCT_ID?: number
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
        if (nextProps.FORM_POST_RESULT_PRODUCT_ID && (this.props.FORM_POST_RESULT_PRODUCT_ID != nextProps.FORM_POST_RESULT_PRODUCT_ID)) {
            this.props.getInitialViewModel()
            this.props.form.resetFields()
            this.props.onPostSucceeded(nextProps.FORM_POST_RESULT_PRODUCT_ID)
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
                        </Row>
                    </TabPane>
                </Tabs>
            </Form>
        )
    }

    renderHidden() {
        return (
            <div>
                {this.props.form.getFieldDecorator(nameof<ProductViewModel>(o => o.entityId), {
                        initialValue: this.props.initProductViewModel.entityId
                    })(<Input key="id" type="hidden" />)}
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
                <FormItem label="Brand">
                    {this.props.form.getFieldDecorator(nameof<ProductViewModel>(o => o.brandId), {
                        rules: [{ required: true, message: 'Brand is required!' }],
                        initialValue: this.props.initProductViewModel.brandId
                    })(
                        <Select placeholder="Brand">
                            {
                                this.props.initProductViewModel.avaliableBrands && this.props.initProductViewModel.avaliableBrands.map((e) => (
                                    <Option key={e.id} value={e.id}>{e.label}</Option>
                                ))
                            }
                        </Select>
                        )}
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