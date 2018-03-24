import * as React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form, notification } from 'antd'

import { AvatarSelect, FileSelectModal, PictureWall, CleanSelectedResult } from 'shared/modules/FileAndMedia'
import { ModuleRootState, BlogViewModel } from '../../../../Types'
import { RequestSend, ExtractImmutableHOC, ShowNotification } from 'shared/core'

import { BlogFormStateProps, BlogFormDispatchProps, BlogForm, BlogFormProps } from '../components'
import { getTags } from './actions'

const mapStateToProps = (state: ModuleRootState, ownProps): BlogFormStateProps => {
  return {
    initBlogViewModel: state.data.getIn(['initBlogViewModel', 'response']) || {},
    allTags: state.data.getIn([getTags.dataKey, 'response']) || [],
    FORM_POST_RESULT_BLOG_ID: state.data.getIn(['FORM_POST_RESULT_BLOG_ID', 'response', 'result']),
  }
}

const mapDispatchToProps = (dispatch, ownProps: BlogFormProps): BlogFormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const params = new URL(location.href).searchParams
      params.append('IsEditModel', String(true))

      const requestSendAction = RequestSend(
        'initBlogViewModel', {
          url: `/blog/get?${params.toString()}`,
          requestInit: {
            credentials: 'include'
          }
        }
      )
      dispatch(requestSendAction)
    },
    getTag: () => {
      dispatch(getTags)
    },
    post(FormValues) {
      const body = { ...FormValues }
      if (body.content)
        body.content = JSON.stringify(body.content)
      
      const requestSendAction = RequestSend(
        'FORM_POST_RESULT_BLOG_ID', {
          url: `/blog/update`,
          requestInit: {
            method: 'PUT',
            headers: new Headers({
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(body),
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
          title: 'Saved!',
          description: 'Update Successfuly.'
        }
      })
      dispatch(showNotificationAction)
    }
  }
}

const BlogFormComponentWithPureData = ExtractImmutableHOC(BlogForm)

export const BlogFormUpdate = connect(mapStateToProps, mapDispatchToProps)(BlogFormComponentWithPureData)

