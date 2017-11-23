import './LoginForm.scss'

import * as React from 'react'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, Card, Alert } from 'antd'

import { RequestSend, ExtractImmutableHOC } from '../../../../../core'
import { ExtendedRootState } from '../../../Types'

import { connect } from 'react-redux'

interface LoginFormProps {
  form: any
  loginResult: any
  onLogin: (data: any) => void
  redirectToDashboard: () => void
}

export class NormalLoginForm extends React.Component<LoginFormProps> {
  static defaultProps = {
    loginResult: {
      status: {},
      response: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginResult.response && nextProps.loginResult.response.code === 'LOGIN_SUCCEEDED')
      this.props.redirectToDashboard()
  }

  render() {
    const { form: { getFieldDecorator }, loginResult } = this.props

    const isLoginFailed = loginResult.response && loginResult.response.code === "LOGIN_FAILED"
    return (
      <Card className="account-form-wrap">
        {
          isLoginFailed && (
            <div className="mb-3">
              <Alert message="Sorry, we cann't let you pass. Make sure your information is correct!" type="error" showIcon />
            </div>
          )
        }
        <Form onSubmit={this.handleSubmit} className="account-form login-form">
          <h2 className="account-form-heading">Login</h2>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(<Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} type="email" placeholder="Email" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
              )}
          </Form.Item>
          <Form.Item className="mb-0">
            {getFieldDecorator('rememberMe', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
              )}
            <a className="account-form-forgot" href="">Forgot password</a>
            <Button type="primary" loading={loginResult.status.processing} htmlType="submit" className="account-form-button">
              Log in
            </Button>
            Or <Link to="/account/register">register now!</Link>
          </Form.Item>
        </Form>
      </Card>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err)
        this.props.onLogin(values)
    })
  }
}

const mapStateToProps = (state: ExtendedRootState) => {
  return {
    loginResult: state.data.get('loginResult'),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogin: (data) => {
      const requestSendAction = RequestSend(
        'loginResult', {
          url: '/account/onlogin',
          requestInit: {
            method: 'POST',
            headers: new Headers({
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data),
            credentials: 'include'
          }
        })
      dispatch(requestSendAction)
    },
    redirectToDashboard: () => {
      dispatch(push('/website/admin/construction'))
    }
  }
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(ExtractImmutableHOC(NormalLoginForm))

export const LoginForm = Form.create()(ConnectedLoginForm)