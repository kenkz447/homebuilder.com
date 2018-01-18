import * as React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form } from 'antd'

import { AvatarSelect, FileSelectModal, PictureWall, CleanSelectedResult } from 'shared/modules/FileAndMedia'
import { ModuleRootState, BlogViewModel } from '../../../../Types'
import { RequestSend, ExtractImmutableHOC, ShowNotification } from 'shared/core'

import { BlogFormStateProps, BlogFormDispatchProps, BlogForm } from '../components'

const mapStateToProps = (state: ModuleRootState, ownProps): BlogFormStateProps => {
  return {
    initBlogViewModel: state.data.getIn(['INIT_BLOG_VIEW_MODEL', 'response', 'result']) || {},
    FORM_POST_RESULT_BLOG_ID: state.data.getIn(['FORM_POST_RESULT_BLOG_ID', 'response', 'result'])
  }
}

const mapDispatchToProps = (dispatch, ownProps): BlogFormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const params = new URLSearchParams()
      params.append('IsEditModel', String(true))

      const requestSendAction = RequestSend(
        'INIT_BLOG_VIEW_MODEL', {
          url: `/blog/Get?${params.toString()}`,
          requestInit: {
            method: 'Get',
            credentials: 'include'
          }
        })
      dispatch(requestSendAction)
    },
    post(FormValues) {
      const requestSendAction = RequestSend(
        'FORM_POST_RESULT_BLOG_ID', {
          url: `/blog/create`,
          requestInit: {
            method: 'POST',
            headers: new Headers({
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(FormValues),
            credentials: 'include'
          }
        }
      )
      dispatch(requestSendAction)
    },

    onPostSucceeded(newBlogId) {
      const showNotificationAction = ShowNotification({
        notifyType: 'success',
        display: {
          title: 'Created!',
          description: 'Create a new Blog Successfuly.'
        }
      })
      dispatch(showNotificationAction)
      dispatch(push(`/website/admin/blog/update?${nameof<BlogViewModel>(o => o.entityId)}=${newBlogId}`))
    }
  }
}

const BlogFormComponentWithPureData = ExtractImmutableHOC(BlogForm)

export const BlogFormNew = connect(mapStateToProps, mapDispatchToProps)(BlogFormComponentWithPureData)

