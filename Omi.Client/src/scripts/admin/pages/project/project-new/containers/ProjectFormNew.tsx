import * as React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form} from 'antd'

import { AvatarSelect, FileSelectModal, PictureWall } from 'shared/modules/FileAndMedia'
import { ModuleRootState, ProjectViewModel } from '../../../../Types'
import { RequestSend, ExtractImmutableHOC, ShowNotification } from 'shared/core'

import { FormStateProps, FormDispatchProps, ProjectForm } from '../../_shared/components/ProjectForm'

const mapStateToProps = (state: ModuleRootState, ownProps): FormStateProps => {
  return {
    initValue: state.data.getIn(['initProjectViewModel', 'response', 'result'])  || {},
    formPostResultProjectId: state.data.getIn(['formPostResultProjectId', 'response', 'result'])
  }
}

const mapDispatchToProps = (dispatch, ownProps): FormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const requestSendAction = RequestSend(
        'initProjectViewModel', {
          url: `/project/GetEmptyProjectViewModel`,
          requestInit: {
            method: 'Get',
            credentials: 'include'
          }}
        )
      dispatch(requestSendAction)
    },
    post(FormValues) {
      const requestSendAction = RequestSend(
        'formPostResultProjectId', {
          url: `/project/createNewProject`, 
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

    redirectToEdit(newProjectId) {
      const showNotificationAction = ShowNotification({
        notifyType: 'success',
        display: {
          title: 'Created!',
          description: 'Create a new Project successfuly.'
        }
      })
      dispatch(showNotificationAction)
      dispatch(push(`/website/homebuilder/project/update?projectId=${newProjectId}`))
    }
  }
}

const ProjectFormComponentWithPureData = ExtractImmutableHOC(ProjectForm)

export const ProjectFormNew = connect(mapStateToProps, mapDispatchToProps)(ProjectFormComponentWithPureData)

