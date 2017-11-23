import "./RegisterForm.scss"

import * as React from 'react'
import { push } from 'react-router-redux'

import { Form, Input, Button, Card, Alert, Row, Col } from 'antd'

import { RequestSend, ExtractImmutableHOC } from '../../../../../core'
import { ExtendedRootState } from '../../../types'

import { connect } from 'react-redux'

interface FormActionProps {
  onPost: (data: any) => void
  onPostSucceeded: (data: any) => void
}

interface FormProps extends FormActionProps {
  form?: any
}

const formPostResult = 'registerResult'
const formAction = '/account/onRegister'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 8,
    },
  },
}
class PureRegisterForm extends React.Component<FormProps> {
  static defaultProps = {
    [formPostResult]: {
      status: {},
      response: {}
    }
  }

  state = {
    confirmDirty: false
  }

  componentWillReceiveProps(nextProps) {
    // Redirect to Dashboard Page when login succeeded
    const { onPostSucceeded } = nextProps
    if (nextProps[formPostResult].response && nextProps[formPostResult].response.code === 'REGISTER_SUCCESSED')
      onPostSucceeded()
  }

  render() {
    const { form: { getFieldDecorator } } = this.props

    const isPostFailed = this.props[formPostResult].response && this.props[formPostResult].response.code === "POST_CUSTOM_ERRORS"
    return (
      <Card className={`register-form account-form-wrap`}>
        {
          isPostFailed && (
            <div className="mb-3">
              {
                this.props[formPostResult].response.customErrors.map((error: string) => (
                  <Alert className="mb-1" message={error} type="error" />
                ))
              }
            </div>
          )
        }
        <Form onSubmit={this.handleSubmit} className={`account-form`}>
          <Row>
            <Col {...tailFormItemLayout.wrapperCol}>
              <h2 className={`account-form-heading`}>Register</h2>
            </Col>
          </Row>

          <FormItem {...formItemLayout} label="E-mail" hasFeedback>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" />
              )}
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!'
              }, { validator: this.checkPassword }],
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem className="mb-0" {...tailFormItemLayout}>
            <Button type="primary" loading={this.props[formPostResult].status.processing} htmlType="submit">Register</Button>
          </FormItem>
        </Form>
      </Card>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err)
        this.props.onPost(values)
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty)
      form.validateFields(['confirm'], { force: true })
    callback()
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }
}

const mapStateToProps = (state: ExtendedRootState) => {
  return {
    [formPostResult]: state.data.get(formPostResult),
  }
}

const mapDispatchToProps = (dispatch, ownProps): FormActionProps => {
  return {
    onPost: (data) => {
      const requestSendAction = RequestSend(
        formPostResult, {
          url: formAction,
          requestInit: {
            method: 'POST',
            headers: new Headers({
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data),
          }
        })
      dispatch(requestSendAction)
    },

    onPostSucceeded: () => {
      dispatch(push('/dashboard'))
    }
  }
}

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(ExtractImmutableHOC(PureRegisterForm))

export const RegisterForm = Form.create()(ConnectedForm)