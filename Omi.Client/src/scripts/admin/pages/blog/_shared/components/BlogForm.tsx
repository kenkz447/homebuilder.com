import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Tabs, Form, Input, Row, Col, Select } from 'antd'

import { AvatarSelect, PictureWall } from 'shared/modules/FileAndMedia'
import { BlogViewModel } from '../../../../Types'
import { Editor } from '../../../../components'

export interface BlogFormDispatchProps {
    getInitialViewModel?: () => void
    post?: (FormValues: BlogViewModel) => void
    onPostSucceeded?: (entityId: number) => void
    cleanSelectedResult?: () => void
}

export interface BlogFormStateProps {
    initBlogViewModel?: BlogViewModel
    FORM_POST_RESULT_BLOG_ID?: number
    searchParams?: string
}

export interface BlogFormProps extends BlogFormStateProps, BlogFormDispatchProps {
    form: any
}

const FormItem = Form.Item
const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input

const operations = [
    <Button key="submit" type="primary" htmlType="submit">Submit</Button>
]

class BlogFormComponent extends React.Component<BlogFormProps> {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps: BlogFormProps) {
        if (nextProps.FORM_POST_RESULT_BLOG_ID && (this.props.FORM_POST_RESULT_BLOG_ID != nextProps.FORM_POST_RESULT_BLOG_ID)) {
            this.props.onPostSucceeded(nextProps.FORM_POST_RESULT_BLOG_ID)
            location.reload()
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
                    <TabPane tab="Blog info" key="1">
                        <Row gutter={30}>
                            <Col span={8}>
                                {this.renderBasicInfomation.bind(this)()}
                            </Col>
                            <Col span={16}>
                                {this.renderContent.bind(this)()}
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
                {this.props.form.getFieldDecorator(nameof<BlogViewModel>(o => o.id), {
                    initialValue: this.props.initBlogViewModel.id
                })(<Input key="id" type="hidden" />)}
            </div>)
    }

    renderBasicInfomation() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Basic infomation</h2>
                <FormItem>
                    {this.props.form.getFieldDecorator(nameof<BlogViewModel>(o => o.avatar), {
                        rules: [{ required: true, message: 'Please select avatar!' }],
                        initialValue: this.props.initBlogViewModel.avatar
                    })(<AvatarSelect />)}
                </FormItem>
                <FormItem label="Title">
                    {this.props.form.getFieldDecorator(nameof<BlogViewModel>(o => o.title), {
                        rules: [{ required: true, message: 'Title is required!' }],
                        initialValue: this.props.initBlogViewModel.title
                    })(<Input placeholder="Title" />)}
                </FormItem>
                <FormItem label="Description">
                    {this.props.form.getFieldDecorator(nameof<BlogViewModel>(o => o.description), {
                        rules: [{ required: true, message: 'Price is required!' }],
                        initialValue: this.props.initBlogViewModel.description
                    })(<Input.TextArea  placeholder="Short text..." />)}
                </FormItem>
            </fieldset>
        )
    }

    renderContent() {
        return (
            <fieldset>
                <h2 className="form-legend mb-4">Content</h2>
                <FormItem>
                    {this.props.form.getFieldDecorator(nameof<BlogViewModel>(o => o.content), {
                        initialValue: this.props.initBlogViewModel.content
                    })(<Editor />)}
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

export const BlogForm = Form.create()(BlogFormComponent)