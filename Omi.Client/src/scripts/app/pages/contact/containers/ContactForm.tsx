import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Row, Col, Button, Modal } from 'antd'

import { RequestSend, RequestCacheDelete } from '../../../../shared/core'
import { WebsiteRootState } from '../../../Types'

const sendImg = require('../../../../../images/send.png')

interface DispatchProps {
    onPost?: (values) => void
    resetPostResult?: () => void
}
interface StateProps {
    postResultCode?: string
}
interface OwnProps {
    form?: any
}

@(Form.create() as any)
class ContactForm extends React.Component<OwnProps & StateProps & DispatchProps> {
    componentWillReceiveProps(nextProps: StateProps) {
        if (nextProps.postResultCode == 'POST_SUCCEEDED') {
            this.props.resetPostResult()
            this.showSuccessModal()
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item className="mb-3">
                        {this.props.form.getFieldDecorator('fullname')(
                            <Input placeholder="Full name" />
                        )}
                    </Form.Item>
                    <Form.Item className="mb-3">
                        {this.props.form.getFieldDecorator('email')(
                            <Input type="email" placeholder="Email" />
                        )}
                    </Form.Item>
                    <Form.Item className="mb-3">
                        {this.props.form.getFieldDecorator('phone')(
                            <Input type="number" placeholder="Phone" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {this.props.form.getFieldDecorator('message')(
                            <Input.TextArea rows={6} placeholder="Message" />
                        )}
                    </Form.Item>
                    <div>
                        <Button className="home-send-btn" shape="circle" htmlType="submit">
                            <img src={sendImg} />
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }

    showSuccessModal() {
        Modal.success({
            title: 'This is a success message',
            content: 'some messages...some messages...'
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err)
                this.props.onPost(values)
        })
    }
}

const mapStateToProps = (state: WebsiteRootState, ownProps): StateProps => {
    return {
        postResultCode: state.data.getIn(['SEND_CONTACT', 'response', 'code'])
    }
}

const mapDispatchToProps = (dispatch, ownProps): DispatchProps => {
    return {
        onPost: (values) => {
            const sendContactAction = RequestSend(
                'SEND_CONTACT', {
                    url: '/contact/send',
                    requestInit: {
                        method: 'POST',
                        headers: new Headers({
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify(values),
                    }
                })
            dispatch(sendContactAction)
        },
        resetPostResult: () => {
            const action = RequestCacheDelete('SEND_CONTACT')
            dispatch(action)
        }
    }
}

export const ConnectedContactForm = connect(mapStateToProps, mapDispatchToProps)(ContactForm)