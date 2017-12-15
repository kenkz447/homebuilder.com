import * as React from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Form, notification } from 'antd'
import { extend } from 'jquery-slim'

import { AvatarSelect, FileSelectModal, PictureWall } from 'shared/modules/FileAndMedia'
import { ModuleRootState, ProjectViewModel } from '../../../../Types'
import { RequestSend, ExtractImmutableHOC, ShowNotification } from 'shared/core'

import { FormStateProps, FormDispatchProps, ProjectForm, FormComponent } from '../../_shared/components/ProjectForm'

function ProjectUpdateFormHOC(props) {
  let newProps = props

  if (newProps.initValue.projectBlocks) {
    const roomTypeKeys = newProps.initValue.projectBlocks.map((o) => o.id)

    const processedProps = {
      initValue: {}
    }

    processedProps.initValue[FormComponent.roomTypeKeysFieldName] = roomTypeKeys
    for (const roomType of newProps.initValue.projectBlocks) {
      // Process roomLayouts
      if (roomType.children) {
        roomType['children-keys'] = []
        for (const roomLayout of roomType.children) {
          roomType['children-keys'].push(roomLayout.id)
          roomType[`children-${roomLayout.id}`] = roomLayout
          
          // Process rooms
          if (roomLayout.children) {
            roomLayout['children-keys'] = []
            for (const room of roomLayout.children) {
              roomLayout['children-keys'].push(room.id)
              roomLayout[`children-${room.id}`] = room 
            }
          }
        }
      }
      processedProps.initValue[`${FormComponent.roomTypeFieldName}-${roomType.id}`] = roomType
    }

    newProps = extend(true, processedProps, props)
  }

  return (
    <ProjectForm {...newProps} />
  )
}

const mapStateToProps = (state: ModuleRootState, ownProps): FormStateProps => {
  return {
    initValue: state.data.getIn(['initProjectForUpdate', 'response', 'result']) || {},
    formPostResultProjectId: state.data.getIn(['formPostResultProjectId', 'response', 'result']),
  }
}

const mapDispatchToProps = (dispatch): FormDispatchProps => {
  return {
    getInitialViewModel: () => {
      const searchParams = new URL(location.href).searchParams

      const requestSendAction = RequestSend(
        'initProjectForUpdate', {
          url:`/project/getProject?${searchParams.toString()}`,
          requestInit: {
            credentials: 'include'
          }}
        )
      dispatch(requestSendAction)
    },
    post(FormValues) {
      const requestSendAction = RequestSend(
        'formPostResultProjectId', {
          url: `/project/updateProject`, 
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
          title: 'Saved!',
          description: 'Update Successfuly.'
        }
      })
      dispatch(showNotificationAction)
      window.location.reload()
    }
  }
}

const ProjectFormComponentWithPureData = ExtractImmutableHOC(ProjectUpdateFormHOC)
export const ProjectFormUpdate = connect(mapStateToProps, mapDispatchToProps)(ProjectFormComponentWithPureData)

