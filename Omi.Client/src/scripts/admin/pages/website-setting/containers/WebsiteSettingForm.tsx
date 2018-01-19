import * as React from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'

import { Form, Input, Button, Tabs, Row, Col, Card } from 'antd'

import { ExtractImmutableHOC, RequestSend, ShowNotification, RequestCacheDelete } from '../../../../shared/core'
import { PictureWall, AvatarSelect } from '../../../../shared/modules/FileAndMedia'

import { ModuleRootState, WebsiteSettingFormValue } from '../../../Types'
import { SettingValueViewModel } from '../../../../shared/modules/website'
import { CodeEditor, ConnectedSelectInputLanguage } from '../../../../shared/modules/Modulebase'


interface StateProps {
    formValue?: WebsiteSettingFormValue,
    submitResponseCode?: string
    search?: any
}

interface DispatchProps {
    getFormValue: () => void
    onPost: (formValue) => void
}

interface OwnProps {
    form?: any
}

const operations = [
    <Button key="sudmitBtn" type="primary" htmlType="submit">Submit</Button>
]

@(Form.create<any>() as any)
class WebsiteSettingForm extends React.Component<OwnProps & StateProps & DispatchProps> {

    componentWillMount() {
        this.props.getFormValue()
    }

    componentWillReceiveProps(nextProps: StateProps) {
        if (this.props.search != nextProps.search)
            this.props.getFormValue()
    }

    render() {
        if (!this.props.formValue)
            return null

        return (
            <Card noHovering>
                <Form onSubmit={this.handleSubmit}>
                    <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                        {this.renderWebsiteInfo()}
                        {this.renderContactSetting()}
                    </Tabs>
                </Form>
            </Card>
        )
    }

    renderWebsiteInfo() {
        return (
            <Tabs.TabPane tab="Basic info" key="1">
                <Row gutter={30}>
                    <Col span={8}>
                        <fieldset>
                            <h2>About website</h2>
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.siteTitle.id), {
                                initialValue: this.props.formValue.siteTitle.id
                            })(<Input type="hidden" />)}
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.siteTitle.name), {
                                initialValue: this.props.formValue.siteTitle.name
                            })(<Input type="hidden" />)}
                            <Form.Item label="Title">
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.siteTitle.value), {
                                    initialValue: this.props.formValue.siteTitle.value
                                })(<Input />)}
                            </Form.Item>
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.siteDescription.id), {
                                initialValue: this.props.formValue.siteDescription.id
                            })(<Input type="hidden" />)}
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.siteDescription.name), {
                                initialValue: this.props.formValue.siteDescription.name
                            })(<Input type="hidden" />)}
                            <Form.Item label="Description">
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.siteDescription.value), {
                                    initialValue: this.props.formValue.siteDescription.value
                                })(<Input.TextArea rows={12} />)}
                            </Form.Item>
                        </fieldset>
                    </Col>
                    <Col span={8}>
                        <h2>About company</h2>
                        {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.companyLogo.id), {
                            initialValue: this.props.formValue.companyLogo.id
                        })(<Input type="hidden" />)}
                        {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.companyLogo.name), {
                            initialValue: this.props.formValue.companyLogo.name
                        })(<Input type="hidden" />)}
                        <Form.Item label="Logo">
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.companyLogo.value), {
                                initialValue: this.props.formValue.companyLogo.value
                            })(<AvatarSelect />)}
                        </Form.Item>

                        {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.companyName.id), {
                            initialValue: this.props.formValue.companyName.id
                        })(<Input type="hidden" />)}
                        {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.companyName.name), {
                            initialValue: this.props.formValue.companyName.name
                        })(<Input type="hidden" />)}
                        <Form.Item label="Name">
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.companyName.value), {
                                initialValue: this.props.formValue.companyName.value
                            })(<Input />)}
                        </Form.Item>
                        
                        {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.companyAddress.id), {
                            initialValue: this.props.formValue.companyAddress.id
                        })(<Input type="hidden" />)}
                        {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.companyAddress.name), {
                            initialValue: this.props.formValue.companyAddress.name
                        })(<Input type="hidden" />)}
                        <Form.Item label="Address">
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.companyAddress.value), {
                                initialValue: this.props.formValue.companyAddress.value
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <h2>Social networks</h2>
                        {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.socialNetworks.id), {
                            initialValue: this.props.formValue.socialNetworks.id
                        })(<Input type="hidden" />)}
                        {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.socialNetworks.name), {
                            initialValue: this.props.formValue.socialNetworks.name
                        })(<Input type="hidden" />)}
                        <Form.Item>
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.socialNetworks.value), {
                                initialValue: this.props.formValue.socialNetworks.value
                            })(<CodeEditor />)}
                        </Form.Item>
                    </Col>
                </Row>
            </Tabs.TabPane>
        )
    }

    renderContactSetting() {
        return (
            <Tabs.TabPane tab="Contact" key="3">
                <Row gutter={30}>
                    <Col span={8}>
                        <fieldset>
                            <Form.Item label="Banner image">
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactBannerImage.id), {
                                    initialValue: this.props.formValue.contactBannerImage.id
                                })(<Input type="hidden" />)}
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactBannerImage.name), {
                                    initialValue: this.props.formValue.contactBannerImage.name
                                })(<Input type="hidden" />)}
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactBannerImage.value), {
                                    initialValue: this.props.formValue.contactBannerImage.value
                                })(<AvatarSelect />)}
                            </Form.Item>
                            <Form.Item label="Contact Welcome text">
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactWelcomeHtml.id), {
                                    initialValue: this.props.formValue.contactWelcomeHtml.id
                                })(<Input type="hidden" />)}
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactWelcomeHtml.name), {
                                    initialValue: this.props.formValue.contactWelcomeHtml.name
                                })(<Input type="hidden" />)}
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactWelcomeHtml.value), {
                                    initialValue: this.props.formValue.contactWelcomeHtml.value
                                })(<CodeEditor />)}
                            </Form.Item>
                            <Form.Item label="Contact info">
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactInfoHtml.id), {
                                    initialValue: this.props.formValue.contactInfoHtml.id
                                })(<Input type="hidden" />)}
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactInfoHtml.name), {
                                    initialValue: this.props.formValue.contactInfoHtml.name
                                })(<Input type="hidden" />)}
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactInfoHtml.value), {
                                    initialValue: this.props.formValue.contactInfoHtml.value
                                })(<CodeEditor />)}
                            </Form.Item>
                        </fieldset>
                    </Col>
                    <Col span={8}>
                        <fieldset>
                            <h2>Contact Sender</h2>
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactSendToEmail.id), {
                                initialValue: this.props.formValue.contactSendToEmail.id
                            })(<Input type="hidden" />)}
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactSendToEmail.name), {
                                initialValue: this.props.formValue.contactSendToEmail.name
                            })(<Input type="hidden" />)}
                            <Form.Item label="Send to email">
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactSendToEmail.value), {
                                    initialValue: this.props.formValue.contactSendToEmail.value
                                })(<Input type="email" />)}
                            </Form.Item>

                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactSendFromEmail.id), {
                                initialValue: this.props.formValue.contactSendFromEmail.id
                            })(<Input type="hidden" />)}
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactSendFromEmail.name), {
                                initialValue: this.props.formValue.contactSendFromEmail.name
                            })(<Input type="hidden" />)}
                            <Form.Item label="Send from email">
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactSendFromEmail.value), {
                                    initialValue: this.props.formValue.contactSendFromEmail.value
                                })(<Input type="email" />)}
                            </Form.Item>

                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactSendFromEmailPassword.id), {
                                initialValue: this.props.formValue.contactSendFromEmailPassword.id
                            })(<Input type="hidden" />)}
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactSendFromEmailPassword.name), {
                                initialValue: this.props.formValue.contactSendFromEmailPassword.name
                            })(<Input type="hidden" />)}
                            <Form.Item label="Send from email (password)">
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactSendFromEmailPassword.value), {
                                    initialValue: this.props.formValue.contactSendFromEmailPassword.value
                                })(<Input />)}
                            </Form.Item>
                        </fieldset>
                    </Col>
                    <Col span={8}>
                        <fieldset>
                            <h2>Google Map</h2>
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactMapLatitude.id), {
                                initialValue: this.props.formValue.contactMapLatitude.id
                            })(<Input type="hidden" />)}
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactMapLatitude.name), {
                                initialValue: this.props.formValue.contactMapLatitude.name
                            })(<Input type="hidden" />)}
                            <Form.Item label="Latitude">
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactMapLatitude.value), {
                                    initialValue: this.props.formValue.contactMapLatitude.value
                                })(<Input />)}
                            </Form.Item>

                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactMapLongitude.id), {
                                initialValue: this.props.formValue.contactMapLongitude.id
                            })(<Input type="hidden" />)}
                            {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactMapLongitude.name), {
                                initialValue: this.props.formValue.contactMapLongitude.name
                            })(<Input type="hidden" />)}
                            <Form.Item label="Longitude">
                                {this.props.form.getFieldDecorator(nameof.full<WebsiteSettingFormValue>((o) => o.contactMapLongitude.value), {
                                    initialValue: this.props.formValue.contactMapLongitude.value
                                })(<Input />)}
                            </Form.Item>
                        </fieldset>
                    </Col>
                </Row>
            </Tabs.TabPane>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values: WebsiteSettingFormValue) => {
            if (!err)
                this.props.onPost(values)
        })
    }
}

const mapStateToProps = (state: ModuleRootState, ownProps: OwnProps): StateProps => {
    return {
        formValue: state.data.getIn(['WEBSITE_SETTING', 'response']),
        submitResponseCode: state.data.getIn(['WEBSITE_SETTING_SUBMIT', 'response']),
        search: state.router.location.search
    }
}

const mapDispatchToProps = (dispatch, ownProps: OwnProps): DispatchProps => {
    return {
        getFormValue: () => {
            const requestAction = RequestSend('WEBSITE_SETTING', {
                url: '/website-settings'
            })
            dispatch(requestAction)
        },
        onPost: (formValue) => {
            const requestAction = RequestSend('WEBSITE_SETTING_SUBMIT', {
                url: '/website-settings',
                requestInit: {
                    method: 'PUT',
                    headers: new Headers({
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify(formValue),
                    credentials: 'include'
                },
                callbacks: {
                    sucess: () => {
                        const showNotificationAction = ShowNotification({
                            notifyType: 'success',
                            display: {
                                title: 'Saved!',
                                description: 'Update Successfuly.'
                            }
                        })
                        dispatch(showNotificationAction)
                    }
                }
            })
            dispatch(requestAction)
        }
    }
}

export const ConnectedWebsiteSettingForm = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ExtractImmutableHOC(WebsiteSettingForm))